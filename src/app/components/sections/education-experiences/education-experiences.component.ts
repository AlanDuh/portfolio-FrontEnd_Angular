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
  baseContainer:EducExp[] = [];
  dragging:boolean = false;
  cardDragging:number = 0;

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

  onDragStart(cardDragging:number) {
    this.cardDragging = cardDragging;
    this.dragging = true;
    this.baseContainer = [];
    this.cardsContainer.forEach(card => this.baseContainer.push(card));
  }

  onDragEnter(cardOver:number) {
    if (cardOver !== this.cardDragging) {
      this.moveCard(
        this.cardsContainer.indexOf(this.cardsContainer.find(card => card.id === this.cardDragging) as EducExp),
        this.cardsContainer.indexOf(this.cardsContainer.find(card => card.id === cardOver) as EducExp),
        false
        )
      this.cardDragging = cardOver;
    }
  }

  async onDragEnd() {
    this.setLoading.emit(true);
    let cardsToUpdate:EducExp[] = []
    for (let card in this.cardsContainer) {
      if (this.cardsContainer[card] !== this.baseContainer[card]) cardsToUpdate.push(this.cardsContainer[card]);
    }
    if (cardsToUpdate.length > 0) {
      let existsNext:boolean = true;
      let idx:number = 0;
      while (existsNext) {
        let isLastCard:boolean = false;
        if (idx === cardsToUpdate.length - 1) isLastCard = true;
        await this.contentLoader.setEducExp(
          cardsToUpdate[idx],
          this.type,
          isLastCard
        ).then(()=>{
          if (isLastCard) existsNext = false;
          idx++;
        });
      }
    }
    this.setLoading.emit(false);
  }

}
