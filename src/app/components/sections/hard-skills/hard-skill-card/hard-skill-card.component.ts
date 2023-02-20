import { Component, Input, Output, EventEmitter } from '@angular/core';

import { HardSkill } from 'src/app/interfaces';
import { HardSkillEditorComponent } from 'src/app/components/modals/hard-skill-editor/hard-skill-editor.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContentLoaderService } from 'src/app/services/content-loader.service';

@Component({
  selector: 'app-hard-skill-card',
  templateUrl: './hard-skill-card.component.html',
  styleUrls: ['./hard-skill-card.component.css']
})
export class HardSkillCardComponent {

  @Input() loged:boolean = false;
  @Input() loading:boolean = false;
  @Input() card:HardSkill = {
    id:0,
    name:'',
    value:0,
    points:{
        positives:[],
        negatives:[]
    },
    background:null
  };
  @Input() dragging:boolean = false;
  @Input() index:number = 0;
  @Input() type:string = '';
  @Output() setLoading = new EventEmitter<boolean>();
  @Output() cardMove = new EventEmitter<{from:HardSkill,to:string,updateDb:boolean}>();
  @Output() startDrag = new EventEmitter<HardSkill>();
  @Output() enterDrag = new EventEmitter<HardSkill>();
  @Output() endDrag = new EventEmitter<void>();
  @Output() overDrag = new EventEmitter<Event>();

  constructor (
    private modalService: NgbModal,
    private contentLoader: ContentLoaderService
  ) { }

  editCard() {
    let modal:NgbModalRef = this.modalService.open(HardSkillEditorComponent, {backdrop: 'static', keyboard: false});
    modal.componentInstance.card = this.card;
  }

  async deleteCard() {
    this.setLoading.emit(true);
    await this.contentLoader.deleteHardSkill(this.card).then(()=>this.setLoading.emit(false));
  }
}
