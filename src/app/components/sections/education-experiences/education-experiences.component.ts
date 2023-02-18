import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { EducExp } from 'src/app/interfaces';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EducExpEditorComponent } from '../../modals/educ-exp-editor/educ-exp-editor.component';

@Component({
  selector: 'app-education-experiences',
  templateUrl: './education-experiences.component.html',
  styleUrls: ['./education-experiences.component.css']
})
export class EducationExperiencesComponent implements OnInit {

  @Input() loading:boolean = false;
  @Output() setLoading = new EventEmitter<boolean>();
  @Input() type:string = '';
  sectionTitle:string = '';
  cardsContainer:EducExp[] = [];
  loged:boolean = false;
  accountSubscription?:Subscription;
  contentSubscription?:Subscription;

  constructor(
    private contentLoader: ContentLoaderService,
    private account: AccountSettingsService,
    private modalService: NgbModal
  ) {
    this.accountSubscription = this.account.onChange().subscribe(value => this.loged = value);
  }

  ngOnInit(): void {
    this.sectionTitle = this.type;
    this.sectionTitle = this.sectionTitle[0].toUpperCase() + this.sectionTitle.slice(1);
    switch (this.type) {
      case 'education':
        this.contentSubscription = this.contentLoader.onEducationChange().subscribe(items => this.cardsContainer = items);
        this.contentLoader.getDbEducation();
        break;
      case 'experiences':
        this.contentSubscription = this.contentLoader.onExperiencesChange().subscribe(items => this.cardsContainer = items);
        this.contentLoader.getDbExperiences();
        break;
      default:
        break;
    }
  }
  
  async moveCard(from: number, to: number, updateDb:boolean) {
    if (to >= 0 && to < this.cardsContainer.length) {
      this.setLoading.emit(true);
      const cardInTargetId:number = this.cardsContainer[to].id;
      const cardToMoveId:number = this.cardsContainer[from].id;
      this.cardsContainer[from].id = cardInTargetId;
      this.cardsContainer[to].id = cardToMoveId;
      const cardInTarget:EducExp = this.cardsContainer[to];
      const cardToMove:EducExp = this.cardsContainer[from];
      if (updateDb) {
        await this.contentLoader.setEducExp(cardToMove, this.type, false)
          .then(() =>
            this.contentLoader.setEducExp(cardInTarget, this.type, true)
          )
      } else {
        this.cardsContainer[to] = cardToMove;
        this.cardsContainer[from] = cardInTarget;
      }
      this.setLoading.emit(false);
    }
  }

  addCard():void {
    let openModal:NgbModalRef = this.modalService.open(EducExpEditorComponent, {backdrop: 'static', keyboard: false});
    openModal.componentInstance.type = this.type;
    openModal.componentInstance.idx = this.cardsContainer.length;
  }

}
