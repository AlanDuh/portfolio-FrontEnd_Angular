import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EducExp } from 'src/app/interfaces';

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
  @Output() cardMove = new EventEmitter<{from:number,to:number}>();
  bgImage:string = '/';

  ngOnInit():void {
    switch (this.type) {
      case 'Experiences':
        this.bgImage = '../../../../../assets/imgs/computadora.png';
        break;
      case 'Education':
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



}
