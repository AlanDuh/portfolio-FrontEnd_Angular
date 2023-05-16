import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SoftSkill } from 'src/app/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { SoftSkillEditorComponent } from 'src/app/components/modals/soft-skill-editor/soft-skill-editor.component';
import { Card } from 'src/app/general_classes/card';

@Component({
  selector: 'app-soft-skill-card',
  templateUrl: './soft-skill-card.component.html',
  styleUrls: ['./soft-skill-card.component.css']
})
export class SoftSkillCardComponent extends Card implements OnInit {

  override card:SoftSkill = {
    id: 0,
    name: '',
    idx: -1,
    type: '',
    description: '',
    subSkills: []
  };
  
  skillValue:number = 0;
  changeSubscription:Subscription;

  constructor (
    private modalService: NgbModal,
    private contentLoader: ContentLoaderService
  ) {
    super();
    this.changeSubscription = contentLoader.onSoftSkillsChange().subscribe(()=>this.refreshSkillValue());
    this.modifyCard = () => modalService.open(SoftSkillEditorComponent, this.globalModalConfig);
  }

  ngOnInit(): void {
    this.refreshSkillValue()
  }

  deleteCard() {
    this.setLoading.emit(true);
    this.contentLoader.deleteCard(this.card.id, this.card.type);
    this.setLoading.emit(false);
  }

  refreshSkillValue(): void {
    let total:number = 0;
    this.card.subSkills.forEach(subSkill => total += subSkill.val);
    this.skillValue = Math.trunc(total / this.card.subSkills.length);
  }

}
