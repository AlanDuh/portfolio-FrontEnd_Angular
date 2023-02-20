import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { SoftSkill, StoredValue } from 'src/app/interfaces';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-soft-skill-editor',
  templateUrl: './soft-skill-editor.component.html',
  styleUrls: ['./soft-skill-editor.component.css']
})
export class SoftSkillEditorComponent implements OnInit {

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
  baseCard:SoftSkill = {
    id:0,
    name:'',
    description:'',
    subSkills:[]
  };
  loading:boolean = false;

  constructor (
    private activeModal: NgbActiveModal,
    private contentLoader: ContentLoaderService,
    private alerts: AlertsService
  ) { }

  ngOnInit(): void {
    this.baseCard.id = this.card.id;
    this.baseCard.name = this.card.name;
    this.baseCard.description = this.card.description;
    this.card.subSkills.forEach(subSkill => {
      this.baseCard.subSkills.push({
        id: subSkill.id,
        name: subSkill.name,
        value: subSkill.value
      })
    })
  }

  addSubSkill() {
    this.card.subSkills.push(
      {
        id:this.card.subSkills.length,
        name:'',
        value:0
      }
    )
  }

  cancelEditing() {
    this.closeModal();
    this.card.id = this.baseCard.id;
    this.card.name = this.baseCard.name;
    this.card.description = this.baseCard.description;
    this.card.subSkills = [];
    this.baseCard.subSkills.forEach(subSkill => {
      this.card.subSkills.push({
        id: subSkill.id,
        name: subSkill.name,
        value: subSkill.value
      })
    })
  }

  deleteSubSkill(subSkillToDelete:StoredValue) {
    this.card.subSkills.splice(this.card.subSkills.indexOf(subSkillToDelete), 1);
    for (let idx in this.card.subSkills) {
      this.card.subSkills[idx].id = parseInt(idx);
    }
  }

  checkRequired(): boolean {
    let verified:boolean = true;
    verified = (this.card.name && this.card.description)?true:false;
    if (verified) {
      this.card.subSkills.forEach(subSkill => {
        if (!subSkill.name) verified = false;
      })
    }
    return verified;
  }

  checkModified():boolean {
    let modified:boolean = false;
    modified = (
      this.card.name !== this.baseCard.name ||
      this.card.description !== this.baseCard.description ||
      this.card.subSkills.length !== this.baseCard.subSkills.length
    )?true:false;
    if (!modified) {
      for (let idx in this.card.subSkills) {
        if (
          this.card.subSkills[idx].name !== this.baseCard.subSkills[idx].name ||
          this.card.subSkills[idx].value !== this.baseCard.subSkills[idx].value
        ) modified = true;
      }
    }
    return modified;
  }

  closeModal() {
    this.activeModal.close();
  }

  async save() {
    this.loading = true;
    if (this.checkRequired()) {
      if (this.checkModified()) {
        let success:boolean = false;
        await this.contentLoader.setSoftSkill(
          this.card,
          true
        ).then(value => {
          this.alerts.addAlert({type: 'success', message: value});
          success = true;
        }).catch(error => console.log(error));
        if (!success) this.alerts.addAlert({type:'danger',message:'No se pudo actualizar la información'});
        else this.closeModal();
      } else {
        this.alerts.addAlert({type:'warning',message:'No se han realizado cambios'});
        this.closeModal();
      }
    } else this.alerts.addAlert({type:'danger',message:'Reyene todos los campos obligatorios'});
    this.loading = false;
  }

}
