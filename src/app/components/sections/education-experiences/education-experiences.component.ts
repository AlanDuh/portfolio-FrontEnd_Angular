import { Component, Input, OnInit } from '@angular/core';

import { EducExp } from 'src/app/interfaces';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EducExpEditorComponent } from '../../modals/educ-exp-editor/educ-exp-editor.component';
import { Section } from 'src/app/general_classes/section';

@Component({
  selector: 'app-education-experiences',
  templateUrl: './education-experiences.component.html',
  styleUrls: ['./education-experiences.component.css']
})
export class EducationExperiencesComponent extends Section implements OnInit {

  @Input() type:string = '';
  sectionTitle:string = '';

  constructor(
    override contentLoader: ContentLoaderService,
    private account: AccountSettingsService,
    private modalService: NgbModal
  ) {
    super()
    this.dataBaseItemModify = async (item:any, updateFront:boolean) => {
      return await new Promise(resolve => {
        // this.contentLoader.setEducExp(item as EducExp, this.type, updateFront)
        //   .then(value => resolve(value));
      })
    }
    this.accountSubscription = this.account.onChange().subscribe(value => this.loged = value);
    this.addCard = () => {
      let openModal:NgbModalRef = this.modalService.open(EducExpEditorComponent, this.globalModalConfig);
      openModal.componentInstance.type = this.type;
      openModal.componentInstance.idx = this.content.length;
    }
  }

  ngOnInit(): void {
    this.sectionTitle = this.type;
    this.sectionTitle = this.sectionTitle[0].toUpperCase() + this.sectionTitle.slice(1);
    switch (this.type) {
      case 'Education':
        this.contentSubscription = this.contentLoader.onEducationChange().subscribe(items => this.content = items);
        // this.contentLoader.getDbEducation();
        break;
      case 'Experience':
        this.contentSubscription = this.contentLoader.onExperiencesChange().subscribe(items => this.content = items);
        // this.contentLoader.getDbExperiences();
        break;
      default:
        break;
    }
  }

}
