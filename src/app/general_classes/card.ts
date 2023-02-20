import { Directive, Input, Output, EventEmitter } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

import {
    EducExp,
    HardSkill,
    SoftSkill,
    Projects
} from '../interfaces';

@Directive()
export class Card {

    // To use this Directive, specify the following callbacks //
    //        in the constructor, and then call super()       //

    protected modifyCard: (()=>NgbModalRef) | undefined;
    // Define deleteCard() in the instance

    // ------------------------------------------------------ //

    @Input() loged:boolean = false;
    @Input() loading:boolean = false;
    @Input() card:
        EducExp |
        HardSkill |
        SoftSkill |
        Projects |
        undefined
    ;
    @Input() dragging:boolean = false;
    @Input() index:number = 0;
    @Input() type:string = '';
    @Output() setLoading = new EventEmitter<boolean>();
    @Output() cardMove = new EventEmitter<{
        from:(
            EducExp |
            HardSkill |
            SoftSkill |
            Projects
        ),
        to:string,
        updateDb:boolean
    }>();
    @Output() startDrag = new EventEmitter<
        EducExp |
        HardSkill |
        SoftSkill |
        Projects
    >();
    @Output() enterDrag = new EventEmitter<
        EducExp |
        HardSkill |
        SoftSkill |
        Projects
    >();
    @Output() endDrag = new EventEmitter<void>();
    @Output() overDrag = new EventEmitter<Event>();
    globalModalConfig:{
        backdrop:"static"
        keyboard:boolean
    } = {
        backdrop: 'static',
        keyboard: false
    }

    editCard(): void {
      let modal:NgbModalRef = (this.modifyCard as ()=>NgbModalRef)();
      modal.componentInstance.card = this.card;
    }

}