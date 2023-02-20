import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SoftSkill } from 'src/app/interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { SoftSkillEditorComponent } from 'src/app/components/modals/soft-skill-editor/soft-skill-editor.component';

@Component({
  selector: 'app-soft-skill-card',
  templateUrl: './soft-skill-card.component.html',
  styleUrls: ['./soft-skill-card.component.css']
})
export class SoftSkillCardComponent implements OnInit {

  @Input() loged:boolean = false;
  @Input() loading:boolean = false;
  @Input() card:SoftSkill = {
    id:0,
    name:'',
    description:'',
    subSkills:[
      {
        id:0,
        name:'',
        value:0
      }
    ]
  };
  @Input() dragging:boolean = false;
  @Input() index:number = 0;
  @Input() type:string = '';
  @Output() setLoading = new EventEmitter<boolean>();
  @Output() cardMove = new EventEmitter<{from:SoftSkill,to:string,updateDb:boolean}>();
  @Output() startDrag = new EventEmitter<SoftSkill>();
  @Output() enterDrag = new EventEmitter<SoftSkill>();
  @Output() endDrag = new EventEmitter<void>();
  @Output() overDrag = new EventEmitter<Event>();

  changeSubscription:Subscription;
  skillValue:number = 0;

  constructor (
    private modalService: NgbModal,
    private contentLoader: ContentLoaderService
  ) {
    this.changeSubscription = contentLoader.onSoftSkillsChange().subscribe(()=>this.refreshSkillValue());
  }

  ngOnInit(): void {
    this.refreshSkillValue()
  }

  async deleteCard() {
    this.setLoading.emit(true);
    await this.contentLoader.deleteSoftSkill(this.card).then(()=>this.setLoading.emit(false));
  }

  refreshSkillValue(): void {
    let total:number = 0;
    this.card.subSkills.forEach(subSkill => total += subSkill.value);
    this.skillValue = Math.trunc(total / this.card.subSkills.length);
  }

  editCard(): void {
    let modal:NgbModalRef = this.modalService.open(SoftSkillEditorComponent, {backdrop: 'static', keyboard: false});
    modal.componentInstance.card = this.card;
  }

}
