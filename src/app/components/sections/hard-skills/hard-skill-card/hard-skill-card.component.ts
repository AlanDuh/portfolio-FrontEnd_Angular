import { Component, Input, Output, EventEmitter } from '@angular/core';

import { HardSkill } from 'src/app/interfaces';
import { HardSkillEditorComponent } from 'src/app/components/modals/hard-skill-editor/hard-skill-editor.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { Card } from 'src/app/general_classes/card';

@Component({
  selector: 'app-hard-skill-card',
  templateUrl: './hard-skill-card.component.html',
  styleUrls: ['./hard-skill-card.component.css']
})
export class HardSkillCardComponent extends Card {

  override card:HardSkill = {
    id:0,
    name:'',
    value:0,
    points:{
        positives:[],
        negatives:[]
    },
    background:null
  };

  constructor (
    private modalService: NgbModal,
    private contentLoader: ContentLoaderService
  ) {
    super();
    this.modifyCard = () => modalService.open(HardSkillEditorComponent, this.globalModalConfig);
  }

  async deleteCard() {
    this.setLoading.emit(true);
    await this.contentLoader.deleteHardSkill(this.card).then(()=>this.setLoading.emit(false));
  }
}
