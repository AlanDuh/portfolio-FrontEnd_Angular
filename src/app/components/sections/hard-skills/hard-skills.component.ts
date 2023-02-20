import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { HardSkill } from 'src/app/interfaces';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HardSkillEditorComponent } from '../../modals/hard-skill-editor/hard-skill-editor.component';

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css']
})
export class HardSkillsComponent implements OnInit {

  @Input() loading:boolean = false;
  @Output() setLoading = new EventEmitter<boolean>();
  loged:boolean = false;
  dragging:boolean = false;
  content:HardSkill[] = [];
  cardDragging:HardSkill|undefined;
  baseContent:HardSkill[] = [] // Used when dragging
  accountSubscription:Subscription;
  contentSubscription:Subscription;

  constructor (
    private accountService: AccountSettingsService,
    private contentLoader: ContentLoaderService,
    private modalService: NgbModal
  ) {
    this.accountSubscription = accountService.onChange().subscribe(value => this.loged = value);
    this.contentSubscription = contentLoader.onHardSkillsChange().subscribe(items => this.content = items);
  }

  ngOnInit():void {
    this.contentLoader.getDbHardSkill();
  }

  async updateDb(cardsToUpdate:HardSkill[]):Promise<boolean> {
    let cardUpdatingIdx:number = 0;
    while (cardUpdatingIdx !== cardsToUpdate.length) {
      await this.contentLoader.setHardSkill(
        cardsToUpdate[cardUpdatingIdx],
        (cardUpdatingIdx === (cardsToUpdate.length - 1))?true:false
      ).then(()=>{
        cardUpdatingIdx++;
      })
    }
    return new Promise(resolve => resolve(true));
  }

  async moveCard(moveingCard:HardSkill, target:HardSkill|string, updateDb:boolean) {
    this.setLoading.emit(true);
    let targetCard:HardSkill|undefined = undefined;
    let targetCardIdx:number;
    let moveingCardIdx:number = this.content.indexOf(moveingCard);
    if (typeof(target) === 'string') {
      targetCardIdx = moveingCardIdx + ((target === 'forward')?-1:1);
      targetCard = this.content[targetCardIdx];
    } else {
      targetCardIdx = this.content.indexOf(target);
      targetCard = target;
    }
    if (targetCard) {
      const moveingCardId:number = moveingCard.id;
      const targetCardId:number = targetCard.id;
      moveingCard.id = targetCardId;
      targetCard.id = moveingCardId;
      const savedTargetCard:HardSkill = targetCard;
      this.content[targetCardIdx] = moveingCard;
      this.content[moveingCardIdx] = savedTargetCard;
      if (updateDb) {
        await this.updateDb([this.content[targetCardIdx], this.content[moveingCardIdx]]);
      }
    } else console.log('No existe a donde quieras mover esta carta');
    if (!this.dragging) this.setLoading.emit(false);
  }

  addCard() {
    const activeModal:NgbModalRef = this.modalService.open(HardSkillEditorComponent,{backdrop: 'static', keyboard: false});
  }

  onDragStart(cardDragging:HardSkill) {
    this.setLoading.emit(true);
    this.baseContent = [];
    this.content.forEach(card => this.baseContent.push(card));
    this.cardDragging = cardDragging;
    this.dragging = true;
  }

  onDragEnter(cardOver:HardSkill) {
    if (this.dragging) {
      this.moveCard(this.cardDragging as HardSkill, cardOver, false);
    }
  }

  onDragOver(event:Event) {
    if (this.dragging) event.preventDefault();
  }

  async onDragEnd() {
    let cardsToEdit:HardSkill[] = [];
    for (let idx in this.content) {
      if (this.content[idx] !== this.baseContent[idx]) cardsToEdit.push(this.content[idx]);
    }
    if (cardsToEdit.length > 0) await this.updateDb(cardsToEdit).then(()=>this.setLoading.emit(false));
    else this.setLoading.emit(false);
  }

}
