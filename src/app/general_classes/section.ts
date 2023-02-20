import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import {
    EducExp,
    HardSkill,
    SoftSkill,
    Projects
} from '../interfaces';

@Directive()
export class Section {

    // To use this Directive, specify the following callbacks //
    //        in the constructor, and then call super()       //

    protected dataBaseItemModify: (
        item: EducExp | HardSkill | SoftSkill | Projects,
        updateFront: boolean
    )=>Promise<string> = async () => new Promise(res => res('void'));
    protected addCard: ()=>void = () => {} // Call the corresponding editor modal 

    // ------------------------------------------------------ //

    @Input() loading:boolean = false;
    @Output() setLoading = new EventEmitter<boolean>();
    loged:boolean = false;
    dragging:boolean = false;
    content:(any)[] = [];
    cardDragging:(
        EducExp |
        HardSkill |
        SoftSkill |
        Projects
        )|undefined;
    baseContent:(
        EducExp |
        HardSkill |
        SoftSkill |
        Projects
        )[] = [] // Used when dragging
    accountSubscription?:Subscription;
    contentSubscription?:Subscription;
    globalModalConfig:{
        backdrop:"static"
        keyboard:boolean
    } = {
        backdrop: 'static',
        keyboard: false
    }

    async updateDb(
        cardsToUpdate:(
            EducExp |
            HardSkill |
            SoftSkill |
            Projects
        )[]
    ):Promise<boolean> {
        let cardUpdatingIdx:number = 0;
        while (cardUpdatingIdx !== cardsToUpdate.length) {
            await this.dataBaseItemModify(
                cardsToUpdate[cardUpdatingIdx],
                (cardUpdatingIdx === (cardsToUpdate.length - 1))?true:false
            ).then(()=>{
                cardUpdatingIdx++;
            })
        }
        return new Promise(resolve => resolve(true));
    }
  
    async moveCard(
        movingCard: EducExp | HardSkill | SoftSkill | Projects,
        target: EducExp | HardSkill | SoftSkill | Projects | string,
        updateDb: boolean
    ) {
        this.setLoading.emit(true);
        let targetCard: EducExp | HardSkill | SoftSkill | Projects | undefined = undefined;
        let targetCardIdx: number;
        let movingCardIdx: number = this.content.indexOf(movingCard);
        if (typeof(target) === 'string') {
            targetCardIdx = movingCardIdx + ((target === 'forward')?-1:1);
            targetCard = this.content[targetCardIdx];
        } else {
            targetCardIdx = this.content.indexOf(target);
            targetCard = target;
        }
        if (targetCard) {
            const movingCardId: number = movingCard.id;
            const targetCardId: number = targetCard.id;
            movingCard.id = targetCardId;
            targetCard.id = movingCardId;
            const savedTargetCard: EducExp | HardSkill | SoftSkill | Projects = targetCard;
            this.content[targetCardIdx] = movingCard;
            this.content[movingCardIdx] = savedTargetCard;
            if (updateDb) {
                await this.updateDb([this.content[targetCardIdx] as any, this.content[movingCardIdx]]);
            }
        } else console.log('No existe a donde quieras mover esta carta');
        if (!this.dragging) this.setLoading.emit(false);
    }
  
    onDragStart(cardDragging: EducExp | HardSkill | SoftSkill | Projects ) {
        this.setLoading.emit(true);
        this.baseContent = [];
        this.content.forEach(card => this.baseContent.push(card));
        this.cardDragging = cardDragging;
        this.dragging = true;
    }
  
    onDragEnter(cardOver: EducExp | HardSkill | SoftSkill | Projects ) {
        if (this.dragging && cardOver !== this.cardDragging) {
            this.moveCard(
                this.cardDragging as EducExp | HardSkill | SoftSkill | Projects,
                cardOver,
                false
            );
        }
    }
  
    onDragOver(event:Event) {
        if (this.dragging) event.preventDefault();
    }
  
    async onDragEnd() {
        let cardsToEdit:(
            EducExp |
            HardSkill |
            SoftSkill |
            Projects
            )[] = [];
        for (let idx in this.content) {
            if (this.content[idx] !== this.baseContent[idx]) cardsToEdit.push(this.content[idx]);
        }
        if (cardsToEdit.length > 0) await this.updateDb(cardsToEdit).then(()=>this.setLoading.emit(false));
        else this.setLoading.emit(false);
    }

}