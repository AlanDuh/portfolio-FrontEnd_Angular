import { Component, OnInit } from '@angular/core';

import { Section } from 'src/app/general_classes/section';
import { SoftSkillEditorComponent } from '../../modals/soft-skill-editor/soft-skill-editor.component';
import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SoftSkill } from 'src/app/interfaces';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent extends Section implements OnInit {

  constructor (
    protected accountService: AccountSettingsService,
    override contentLoader: ContentLoaderService,
    protected modalService: NgbModal
  ) {
    super();
    this.dataBaseItemModify = async (item:any, updateFront:boolean) => {
      return await new Promise(resolve => {
        // this.contentLoader.setSoftSkill(item as SoftSkill, updateFront)
        //   .then(value => resolve(value));
      })
    }
    this.addCard = () => this.modalService.open(SoftSkillEditorComponent, this.globalModalConfig);
    this.accountSubscription = accountService.onChange().subscribe(value => this.loged = value);
    this.contentSubscription = contentLoader.onSoftSkillsChange().subscribe(items => this.content = items);
  }

  ngOnInit(): void {
    // this.contentLoader.getDbSoftSkill();
  }

}
