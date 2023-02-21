import { Component, OnInit } from '@angular/core';

import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { HardSkill } from 'src/app/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HardSkillEditorComponent } from '../../modals/hard-skill-editor/hard-skill-editor.component';
import { Section } from 'src/app/general_classes/section';

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css']
})
export class HardSkillsComponent extends Section implements OnInit {

  constructor (
    private accountService: AccountSettingsService,
    private contentLoader: ContentLoaderService,
    private modalService: NgbModal
  ) {
    super();
    this.dataBaseItemModify = async (item:any, updateFront:boolean) => {
      return await new Promise(resolve => {
        this.contentLoader.setHardSkill(item as HardSkill, updateFront)
          .then(value => resolve(value));
      })
    }
    this.addCard = () => this.modalService.open(HardSkillEditorComponent, this.globalModalConfig);
    this.accountSubscription = accountService.onChange().subscribe(value => this.loged = value);
    this.contentSubscription = contentLoader.onHardSkillsChange().subscribe(items => this.content = items);
  }

  ngOnInit():void {
    this.contentLoader.getDbHardSkill();
  }

}
