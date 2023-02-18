import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EducExp, StoredImage } from 'src/app/interfaces';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-educ-exp-editor',
  templateUrl: './educ-exp-editor.component.html',
  styleUrls: ['./educ-exp-editor.component.css']
})
export class EducExpEditorComponent implements OnInit{

  @Input() idx:number = 0;
  @Input() type:string = '';

  baseItem?:EducExp;
  id:number = 0;
  concept:string = '';
  institutionImage:StoredImage|null = null;
  institutionImageSrc?:string;
  title:string = '';
  institution:string = '';
  date:{
      type:string,
      start:string|null,
      end:string|null
  } = {
    type:'',
    start:null,
    end:null
  };
  general:string|null = null;
  loading:boolean = false;

  constructor (
    private activeModal: NgbActiveModal,
    private contentLoader: ContentLoaderService,
    private alerts: AlertsService
  ) { }

  ngOnInit(): void {
    let item:EducExp|undefined;
    if (this.type === 'education') item = this.contentLoader.Education[this.idx];
    else if (this.type === 'experiences') item = this.contentLoader.Experiences[this.idx];
    if (item) {
      this.baseItem = item;
      this.id = item.id;
      this.concept = item.concept;
      this.institutionImage = item.institutionImage;
      this.institutionImageSrc = item.institutionImage?.src;
      this.title = item.title;
      this.institution = item.institution;
      this.date.type = item.date.type;
      this.date.end = item.date.end;
      this.date.start = item.date.start;
      this.general = item.general;
    }
  }

  generateInstitutionImage():StoredImage|null {
    if (this.institutionImageSrc) {
      if (this.institutionImageSrc === this.institutionImage?.src) return this.institutionImage;
      else return {
        id: new Date().getTime(),
        src: this.institutionImageSrc
      };
    } else return null;
  }

  fileInput(event:Event):void {
    let file = (event.target as any).files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.institutionImageSrc = reader.result as string;
    };
    reader.onerror = error => {
      this.alerts.addAlert({type:'danger',message:'No se ha podido cargar el archivo'});
      console.log('Error: ', error);
    };
  }

  checkRequiredInputs():boolean {
    let checked:boolean = false;
    checked = (this.concept && this.title && this.institution && this.date.type)?true:false;
    if (checked) {
      if (this.date.type === 'finished') checked = (this.date.start && this.date.end)?true:false;
      else if (this.date.type === 'in progress') checked = (this.date.start)?true:false;
      else if (this.date.type === 'completion only') checked = (this.date.end)?true:false;
    }
    return checked;
  }

  async save() {
    this.loading = true;
    if (this.checkRequiredInputs()) {
      let newCard:EducExp = {
        id:this.id,
        concept:this.concept,
        institutionImage:this.generateInstitutionImage(),
        title:this.title,
        institution:this.institution,
        date:this.date,
        general:this.general
      }
      // console.log(
      //   newCard.id !== this.baseItem?.id,
      //   newCard.concept !== this.baseItem?.concept,
      //   newCard.institutionImage !== this.baseItem?.institutionImage,
      //   newCard.title !== this.baseItem?.title,
      //   newCard.institution !== this.baseItem?.institution,
      //   newCard.date !== this.baseItem?.date,
      //   newCard.general !== this.baseItem?.general,
      //   newCard.date, this.baseItem?.date
      //   )
      if (
        newCard.id !== this.baseItem?.id ||
        newCard.concept !== this.baseItem?.concept ||
        newCard.institutionImage !== this.baseItem?.institutionImage ||
        newCard.title !== this.baseItem?.title ||
        newCard.institution !== this.baseItem?.institution ||
        newCard.date.type !== this.baseItem?.date.type ||
        newCard.date.start !== this.baseItem?.date.start ||
        newCard.date.end !== this.baseItem?.date.end ||
        newCard.general !== this.baseItem?.general
        ) {
        let success = false;
        await this.contentLoader.setEducExp(newCard, this.type, true)
          .then(value => {
            this.alerts.addAlert({type:'success', message:value});
            success = true;
          }).catch(err => console.log(err));
        if (!success) this.alerts.addAlert({type:'danger',message:'No se pudo actualizar la información'});
        else this.closeModal();
      } else {
        this.alerts.addAlert({type:'warning',message:'No se han realizado cambios'});
        this.closeModal();
      }
    } else this.alerts.addAlert({type:'danger',message:'Reyene todos los campos obligatorios'});
    this.loading = false;
  }

  closeModal():void {
    this.activeModal.close();
  }

}
