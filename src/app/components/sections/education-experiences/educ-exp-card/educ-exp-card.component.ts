import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EducExp } from 'src/app/interfaces';
import { EducExpEditorComponent } from 'src/app/components/modals/educ-exp-editor/educ-exp-editor.component';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { Card } from 'src/app/general_classes/card';

@Component({
  selector: 'app-educ-exp-card',
  templateUrl: './educ-exp-card.component.html',
  styleUrls: ['./educ-exp-card.component.css']
})
export class EducExpCardComponent extends Card implements OnInit {

  override card:EducExp = {
    id: 0,
    name: '',
    idx: -1,
    type: '',
    title: '',
    institution: '',
    institutionImage: {
      id: 0,
      name: '',
      path: ''
    },
    date1: null,
    date2: null,
    description: ''
  };
  bgImage:string = '/';

  constructor (
    private modalService: NgbModal,
    private contentLoader: ContentLoaderService
  ) {
    super();
    // this.modifyCard = () => {
    //   let openModal:NgbModalRef = this.modalService.open(EducExpEditorComponent, {backdrop: 'static', keyboard: false});
    //   openModal.componentInstance.idx = this.index;
    //   openModal.componentInstance.type = this.type;
    //   return openModal;
    // }
  }

  ngOnInit():void {
    switch (this.card.type) {
      case 'Experience':
        this.bgImage = '../../../../../assets/imgs/computadora.png';
        break;
      case 'Education':
        if (this.card.date2 === null) {
          this.bgImage = '../../../../../assets/imgs/papel.png';
        } else {
          this.bgImage = '../../../../../assets/imgs/diploma.png';
        }
        break;
      default:
        break;
    }
  }

  addLeftZero(num:number): string {
    let str = num.toString();
    return (str.length === 1)? '0' + str: str;
  }

  generateDate(date:string|null):string {
    let newDate = new Date(date as string);
    return this.addLeftZero(newDate.getUTCDate()) + '/' + this.addLeftZero(newDate.getUTCMonth() + 1) + '/' + newDate.getUTCFullYear();
  }

  deleteCard() {
    this.setLoading.emit(true);
    this.contentLoader.deleteCard(this.card.id, this.card.type);
    this.setLoading.emit(false);
  }

  override editCard():void {
    let openModal:NgbModalRef = this.modalService.open(EducExpEditorComponent, this.globalModalConfig);
    openModal.componentInstance.card = this.card;
  }

}
