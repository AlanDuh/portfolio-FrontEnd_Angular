import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EducExp, StoredImage } from 'src/app/interfaces';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-educ-exp-editor',
  templateUrl: './educ-exp-editor.component.html',
  styleUrls: ['./educ-exp-editor.component.css']
})
export class EducExpEditorComponent implements OnInit{

  @Input() card?:EducExp;
  @Input() type?:string;
  form:any;
  // @Input() idx:number = 0;
  // @Input() type:string = '';

  dateType?:string;
  // baseItem?:EducExp;
  // id:number = 0;
  // concept:string = '';
  // institutionImage:StoredImage|null = null;
  // institutionImageSrc?:string;
  // title:string = '';
  // institution:string = '';
  // date:{
  //     type:string,
  //     start:string|null,
  //     end:string|null
  // } = {
  //   type:'',
  //   start:null,
  //   end:null
  // };
  // general:string|null = null;
  loading:boolean = false;

  constructor (
    private activeModal: NgbActiveModal,
    private contentLoader: ContentLoaderService,
    // private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group(
      {
        id: this.card?.id,
        name: [this.card?.name, [Validators.required, Validators.maxLength(255)]],
        idx: this.card?.idx,
        type: this.card?this.card.type:this.type,
        title: [this.card?.title, [Validators.required, Validators.maxLength(245)]],
        institution: [this.card?.institution, [Validators.required, Validators.maxLength(245)]],
        institutionImage: this.formBuilder.group(
          {
            id: this.card?.institutionImage.id,
            path: '',
            name: [this.card?.institutionImage.name, [Validators.maxLength(245)]]
          }
        ),
        date1: this.card?.date1,
        date2: this.card?.date2,
        description: [this.card?.description, [Validators.maxLength(300)]]
      }
    )

  }

  get Name() {

    return this.form.get('name');

  }

  get Title() {

    return this.form.get('title');

  }

  get Institution() {

    return this.form.get('institution');

  }

  get InstitutionImage() {

    return this.form.get('institutionImage.name');

  }

  get Description() {

    return this.form.get('description');

  }

  // ngOnInit(): void {
  //   let item:EducExp|undefined;
  //   if (this.type === 'education') item = this.contentLoader.Education[this.idx];
  //   else if (this.type === 'experiences') item = this.contentLoader.Experiences[this.idx];
  //   if (item) {
  //     this.baseItem = item;
  //     this.id = item.id;
  //     this.concept = item.concept;
  //     this.institutionImage = item.institutionImage;
  //     this.institutionImageSrc = item.institutionImage?.src;
  //     this.title = item.title;
  //     this.institution = item.institution;
  //     this.date.type = item.date.type;
  //     this.date.end = item.date.end;
  //     this.date.start = item.date.start;
  //     this.general = item.general;
  //   }
  // }

  // generateInstitutionImage():StoredImage|null {
  //   if (this.institutionImageSrc) {
  //     if (this.institutionImageSrc === this.institutionImage?.src) return this.institutionImage;
  //     else return {
  //       id: new Date().getTime(),
  //       src: this.institutionImageSrc
  //     };
  //   } else return null;
  // }

  // fileInput(event:Event):void {
  //   let file = (event.target as any).files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.institutionImageSrc = reader.result as string;
  //   };
  //   reader.onerror = error => {
  //     this.alerts.addAlert({type:'danger',message:'No se ha podido cargar el archivo'});
  //     console.log('Error: ', error);
  //   };
  // }

  // checkRequiredInputs():boolean {
  //   let checked:boolean = false;
  //   checked = (this.concept && this.title && this.institution && this.date.type)?true:false;
  //   if (checked) {
  //     if (this.date.type === 'finished') checked = (this.date.start && this.date.end)?true:false;
  //     else if (this.date.type === 'in progress') checked = (this.date.start)?true:false;
  //     else if (this.date.type === 'completion only') checked = (this.date.end)?true:false;
  //   }
  //   return checked;
  // }

  save() {
    this.loading = true;
    // if (this.checkRequiredInputs()) {
    //   let newCard:EducExp = {
    //     id:this.id,
    //     concept:this.concept,
    //     institutionImage:this.generateInstitutionImage(),
    //     title:this.title,
    //     institution:this.institution,
    //     date:this.date,
    //     general:this.general
    //   }
    //   if (
    //     newCard.id !== this.baseItem?.id ||
    //     newCard.concept !== this.baseItem?.concept ||
    //     newCard.institutionImage !== this.baseItem?.institutionImage ||
    //     newCard.title !== this.baseItem?.title ||
    //     newCard.institution !== this.baseItem?.institution ||
    //     newCard.date.type !== this.baseItem?.date.type ||
    //     newCard.date.start !== this.baseItem?.date.start ||
    //     newCard.date.end !== this.baseItem?.date.end ||
    //     newCard.general !== this.baseItem?.general
    //     ) {
    //     let success = false;
    //     await this.contentLoader.setEducExp(newCard, this.type, true)
    //       .then(value => {
    //         this.alerts.addAlert({type:'success', message:value});
    //         success = true;
    //       }).catch(err => console.log(err));
    //     if (!success) this.alerts.addAlert({type:'danger',message:'No se pudo actualizar la información'});
    //     else this.closeModal();
    //   } else {
    //     this.alerts.addAlert({type:'warning',message:'No se han realizado cambios'});
    //     this.closeModal();
    //   }
    // } else this.alerts.addAlert({type:'danger',message:'Reyene todos los campos obligatorios'});

    let res = this.contentLoader.updateData(this.form.value as EducExp);
    if (res) this.closeModal();

    this.loading = false;
  }

  closeModal():void {
    this.activeModal.close();
  }

}
