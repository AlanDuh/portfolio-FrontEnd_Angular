import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { HardSkill, StoredPoint } from 'src/app/interfaces';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-hard-skill-editor',
  templateUrl: './hard-skill-editor.component.html',
  styleUrls: ['./hard-skill-editor.component.css']
})
export class HardSkillEditorComponent implements OnInit {

  @Input() card?:HardSkill;
  form:any;
  // baseCard:HardSkill = {
  //   id:0,
  //   name:'',
  //   value:0,
  //   points:{
  //       positives:[{
  //         id:0,
  //         content:''
  //       }],
  //       negatives:[{
  //         id:0,
  //         content:''
  //       }]
  //   },
  //   background:null
  // };
  // backgroundSrc:string = '';
  loading:boolean = false;
  points:StoredPoint[] = [];
  positivePoints:StoredPoint[] = [];
  negativePoints:StoredPoint[] = [];

  constructor (
    private activeModal: NgbActiveModal,
    private contentLoader: ContentLoaderService,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    
    if (this.card) {

      this.points = this.card.points;
      this.positivePoints = this.card.points.filter(point => point.isPositive);
      this.negativePoints = this.card.points.filter(point => !point.isPositive);

      this.form = this.formBuilder.group(
        {
          id: this.card.id,
          name: [this.card.name, [Validators.required, Validators.maxLength(255)]],
          idx: this.card.idx,
          type: 'HardSkill',
          val: [this.card.val, [Validators.required]],
          background: this.formBuilder.group(
            {
              id: this.card.background.id,
              path: '',
              name: [this.card.background.name, [Validators.maxLength(245)]]
            }
          ),
          points: this.points
        }
      )

    } else {

      this.form = this.formBuilder.group(
        {
          id: 0,
          name: ['', [Validators.required, Validators.maxLength(255)]],
          idx: 0,
          type: 'HardSkill',
          val: [50, [Validators.required]],
          background: this.formBuilder.group(
            {
              id: 0,
              path: '',
              name: ['', [Validators.maxLength(245)]]
            }
          ),
          points: [this.points, []]
        }
      )

    }

  }

  get Name() {

    return this.form.get('name');

  }

  get Val() {

    return this.form.get('val');

  }

  get Background() {

    return this.form.get('background.name');

  }

  // ngOnInit(): void {
  //   this.baseCard.id = this.card.id;
  //   this.baseCard.name = this.card.name;
  //   this.baseCard.value = this.card.value;
  //   this.baseCard.points = {
  //     positives: [],
  //     negatives: []
  //   }
  //   this.card.points.positives.forEach(point => this.baseCard.points.positives.push({
  //     id: point.id,
  //     content: point.content
  //   }));
  //   this.card.points.negatives.forEach(point => this.baseCard.points.negatives.push({
  //     id: point.id,
  //     content: point.content
  //   }));
  //   this.baseCard.background = this.card.background;
  //   if (this.card.background) this.backgroundSrc = this.card.background.src;
  // }

  addPositivePoint(): void {
    let emptyPoint:StoredPoint = {
      description: '',
      isPositive:true
    }
    this.points.push(emptyPoint);
    this.positivePoints.push(emptyPoint);
  }

  addNegativePoint(): void {
    let emptyPoint:StoredPoint = {
      description: '',
      isPositive:false
    }
    this.points.push(emptyPoint);
    this.negativePoints.push(emptyPoint);
  }

  deletePositivePoint(point:StoredPoint): void {
    this.points.splice(this.points.indexOf(point), 1);
    this.positivePoints.splice(this.positivePoints.indexOf(point), 1);
  }

  deleteNegativePoint(point:StoredPoint): void {
    this.points.splice(this.points.indexOf(point), 1);
    this.negativePoints.splice(this.negativePoints.indexOf(point), 1);
  }

  // fileInput(event:Event):void {
  //   let file = (event.target as any).files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.backgroundSrc = reader.result as string;
  //   };
  //   reader.onerror = error => {
  //     this.alerts.addAlert({type:'danger',message:'No se ha podido cargar el archivo'});
  //     console.log('Error: ', error);
  //   };
  // }

  // cancelEditing() {
  //   this.card.id = this.baseCard.id;
  //   this.card.name = this.baseCard.name;
  //   this.card.value = this.baseCard.value;
  //   this.card.points = {
  //     positives: [],
  //     negatives: []
  //   }
  //   this.baseCard.points.positives.forEach(point => this.card.points.positives.push({
  //     id: point.id,
  //     content: point.content
  //   }));
  //   this.baseCard.points.negatives.forEach(point => this.card.points.negatives.push({
  //     id: point.id,
  //     content: point.content
  //   }));
  //   this.closeModal();
  // }

  closeModal(): void {
    this.activeModal.close();
  }

  // checkRequired(): boolean {
  //   let verified:boolean = (this.card.name)?true:false;
  //   if (verified) {
  //     this.card.points.positives.forEach(point => {
  //       if (!point.content) verified = false;
  //     });
  //     this.card.points.negatives.forEach(point => {
  //       if (!point.content) verified = false;
  //     });
  //   }
  //   return verified;
  // }

  // checkModified(): boolean {
  //   let modified:boolean = false;
  //   if (
  //     this.baseCard.id !== this.card.id ||
  //     this.baseCard.name !== this.card.name ||
  //     this.baseCard.value !== this.card.value ||
  //     this.baseCard.points.positives.length !== this.card.points.positives.length ||
  //     this.baseCard.points.negatives.length !== this.card.points.negatives.length ||
  //     this.baseCard.background !== this.card.background
  //   ) modified = true;
  //   else {
  //     for (let idx in this.card.points.positives) {
  //       if (this.baseCard.points.positives[idx].content !== this.card.points.positives[idx].content) modified = true;
  //     }
  //     for (let idx in this.card.points.negatives) {
  //       if (this.baseCard.points.negatives[idx].content !== this.card.points.negatives[idx].content) modified = true;
  //     }
  //   }
  //   return modified;
  // }

   save() {
    this.loading = true;
    // if (this.checkRequired()) {
    //   if (this.backgroundSrc) {
    //     if (
    //       (this.card.background && this.card.background.src !== this.backgroundSrc) ||
    //       !this.card.background
    //     ) {
    //       this.card.background = {
    //         id: new Date().getTime(),
    //         src: this.backgroundSrc
    //       }
    //     }
    //   } else this.card.background = null;
    //   if (this.checkModified()) {
    //     let success:boolean = false;
    //     await this.contentLoader.setHardSkill(
    //       this.card,
    //       true
    //     ).then(value => {
    //       this.alerts.addAlert({type: 'success', message: value});
    //       success = true;
    //     }).catch(error => console.log(error));
    //     if (!success) this.alerts.addAlert({type:'danger',message:'No se pudo actualizar la información'});
    //     else this.closeModal();
    //   } else {
    //     this.alerts.addAlert({type:'warning',message:'No se han realizado cambios'});
    //     this.closeModal();
    //   }
    // } else this.alerts.addAlert({type:'danger',message:'Reyene todos los campos obligatorios'});

    this.form.patchValue({points: this.points});
    let res = this.contentLoader.updateData(this.form.value as HardSkill);
    if (res) this.closeModal();

    this.loading = false;
  }

}
