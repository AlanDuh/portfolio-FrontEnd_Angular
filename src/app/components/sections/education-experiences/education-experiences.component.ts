import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { EducExp } from 'src/app/interfaces';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-education-experiences',
  templateUrl: './education-experiences.component.html',
  styleUrls: ['./education-experiences.component.css']
})
export class EducationExperiencesComponent implements OnInit {

  @Input() type:string = '';
  educationItems:EducExp[] = [];
  experiencesItems:EducExp[] = [];
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
    switch (this.type) {
      case 'Education':
        this.contentSubscription = this.contentLoader.onEducationChange().subscribe(items => this.educationItems = items);
        this.contentLoader.getDbEducation();
        break;
      case 'Experiences':
        this.contentSubscription = this.contentLoader.onExperiencesChange().subscribe(items => this.experiencesItems = items);
        this.contentLoader.getDbExperiences();
        break;
      default:
        break;
    }
  }
  
  moveCard(from: number, to: number):void {
    let container:EducExp[] = [];
    (this.type == 'Education')?container = this.educationItems:container = this.experiencesItems;
    let targetPlace:EducExp = container[to];
    container[to] = container[from];
    container[from] = targetPlace;
  }

  addCard():void {
    console.warn('ADDING CARD');
  }

}
