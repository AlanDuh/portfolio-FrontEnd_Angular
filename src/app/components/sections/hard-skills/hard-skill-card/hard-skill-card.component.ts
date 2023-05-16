import { Component } from '@angular/core';

import { HardSkill, StoredPoint } from 'src/app/interfaces';
import { HardSkillEditorComponent } from 'src/app/components/modals/hard-skill-editor/hard-skill-editor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { Card } from 'src/app/general_classes/card';

@Component({
  selector: 'app-hard-skill-card',
  templateUrl: './hard-skill-card.component.html',
  styleUrls: ['./hard-skill-card.component.css']
})
export class HardSkillCardComponent extends Card {

  override card:HardSkill = {
    id: 0,
    name: '',
    idx: -1,
    type: '',
    val: 0,
    background: {
      id: 0,
      name: '',
      path: ''
    },
    points: []
  };

  constructor (
    private modalService: NgbModal,
    private contentLoader: ContentLoaderService
  ) {
    super();
    this.modifyCard = () => modalService.open(HardSkillEditorComponent, this.globalModalConfig);
  }

  public getPositives():StoredPoint[] {

    return this.card.points.filter(point => point.isPositive);

  }

  public getNegatives():StoredPoint[] {

    return this.card.points.filter(point => !point.isPositive);

  }

  deleteCard() {
    this.setLoading.emit(true);
    this.contentLoader.deleteCard(this.card.id, this.card.type);
    this.setLoading.emit(false);
  }

}
