import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EducExp } from 'src/app/interfaces';
import { EducExpEditorComponent } from 'src/app/components/modals/educ-exp-editor/educ-exp-editor.component';
import { ContentLoaderService } from 'src/app/services/content-loader.service';

@Component({
  selector: 'app-educ-exp-card',
  templateUrl: './educ-exp-card.component.html',
  styleUrls: ['./educ-exp-card.component.css']
})
export class EducExpCardComponent implements OnInit {

  @Input() type:string = '';
  @Input() card:EducExp = {
    id:0,
    concept:'',
    institutionImage:null,
    title:'',
    institution:'',
    date:{
        type:'',
        start:'',
        end:''
    },
    general:null
  };
  @Input() loged:boolean = false;
  @Input() index:number = 0;
  @Input() loading:boolean = false;
  @Output() setLoading = new EventEmitter<boolean>();
  @Output() cardMove = new EventEmitter<{from:number,to:number,updateDb:boolean}>();
  bgImage:string = '/';

  constructor (
    private modalService: NgbModal,
    private contentLoader: ContentLoaderService
  ) { }

  ngOnInit():void {
    switch (this.type) {
      case 'experiences':
        this.bgImage = '../../../../../assets/imgs/computadora.png';
        break;
      case 'education':
        switch (this.card.date.type) {
          case 'in progress':
            this.bgImage = '../../../../../assets/imgs/papel.png';
            break;
          default:
            this.bgImage = '../../../../../assets/imgs/diploma.png';
            break;
        }
        break;
      default:
        break;
    }
  }

  generateDate(date:string|null):string {
    let newDate = new Date(date as string);
    return newDate.getUTCDate() + '/' + (newDate.getUTCMonth() + 1) + '/' + newDate.getUTCFullYear();
  }

  moveForward() {
    this.cardMove.emit({from:this.index, to:this.index - 1, updateDb:true});
  }

  moveBackward() {
    this.cardMove.emit({from:this.index, to:this.index + 1, updateDb:true});
  }

  async deleteCard() {
    this.setLoading.emit(true);
    await this.contentLoader.deleteEducExp(this.card.id, this.type).then();
    this.setLoading.emit(false);
  }

  editCard():void {
    let openModal:NgbModalRef = this.modalService.open(EducExpEditorComponent, {backdrop: 'static', keyboard: false});
    openModal.componentInstance.idx = this.index;
    openModal.componentInstance.type = this.type;
  }

}
