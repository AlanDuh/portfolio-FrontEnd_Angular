import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Projects, StoredImage } from 'src/app/interfaces';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-projects-editor',
  templateUrl: './projects-editor.component.html',
  styleUrls: ['./projects-editor.component.css']
})
export class ProjectsEditorComponent implements OnInit{

  @Input() card?:Projects;

  form:any;
  // baseCard:Projects = {
  //   id:0,
  //   name:'',
  //   description:'',
  //   date:'',
  //   images:[],
  //   links:{
  //       page:'',
  //       gitHub:''
  //   }
  // };
  loading:boolean = false;
  images:StoredImage[] = [];
  imgSrc:string = '';

  constructor (
    private activeModal: NgbActiveModal,
    private contentLoader: ContentLoaderService,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

    if (this.card) {

      this.images = this.card.images;
      this.form = this.formBuilder.group(
        {
          id: this.card.id,
          name: [this.card.name, [Validators.required, Validators.maxLength(255)]],
          idx: this.card.idx,
          type: 'Project',
          description: [this.card.description, [Validators.required, Validators.maxLength(300)]],
          date: [this.card.date, [Validators.required]],
          images: [this.images, []],
          pageLink: [this.card.pageLink, [Validators.required, Validators.maxLength(300)]],
          gitHubLink: [this.card.gitHubLink, [Validators.required, Validators.maxLength(300)]]
        }
      )

    } else {
      
      this.form = this.formBuilder.group(
        {
          id: 0,
          name: ['', [Validators.required, Validators.maxLength(255)]],
          idx: 0,
          type: 'Project',
          description: ['', [Validators.required, Validators.maxLength(300)]],
          date: ['', [Validators.required]],
          images: [this.images, []],
          pageLink: ['', [Validators.required, Validators.maxLength(300)]],
          gitHubLink: ['', [Validators.required, Validators.maxLength(300)]]
        }
      )

    }
    
  }

  get Name() {
    return this.form.get('name');
  }

  get Description() {
    return this.form.get('description');
  }

  get Date() {

    return this.form.get('date');

  }

  get PageLink() {
    return this.form.get('pageLink');
  }

  get GitHubLink() {
    return this.form.get('gitHubLink');
  }

  // ngOnInit(): void {
  //   this.baseCard.id = this.card.id;
  //   this.baseCard.name = this.card.name;
  //   this.baseCard.description = this.card.description;
  //   this.baseCard.date = this.card.date;
  //   this.card.images.forEach(img => this.baseCard.images.push({
  //     id: img.id,
  //     src: img.src
  //   }));
  //   this.baseCard.links.page = this.card.links.page;
  //   this.baseCard.links.gitHub = this.card.links.gitHub;
  // }

  addImage(): void {
    if (this.imgSrc) this.images.push({
      id: 0,
      path: '',
      name: this.imgSrc
    });
    else this.alerts.addAlert({type:'warning', message:'Inserte un link válido de una imagen .PNG o .JPG'});
  }

  // fileInput(event:Event):void {
  //   let file = (event.target as any).files[0];
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.imgSrc = reader.result as string;
  //   };
  //   reader.onerror = error => {
  //     this.alerts.addAlert({type:'danger',message:'No se ha podido cargar el archivo'});
  //     console.log('Error: ', error);
  //   };
  // }

  // checkRequired(): boolean {
  //   let verified: boolean = false;
  //   verified = (
  //     this.card.name &&
  //     this.card.description &&
  //     this.card.date &&
  //     this.card.links.page &&
  //     this.card.links.gitHub
  //   )? true: false;
  //   return verified;
  // }

  // checkModified(): boolean {
  //   let modified: boolean = false;
  //   modified = (
  //     this.baseCard.id !== this.card.id ||
  //     this.baseCard.name !== this.card.name ||
  //     this.baseCard.description !== this.card.description ||
  //     this.baseCard.date !== this.card.date ||
  //     this.baseCard.images.length !== this.card.images.length ||
  //     this.baseCard.links.page !== this.card.links.page ||
  //     this.baseCard.links.gitHub !== this.card.links.gitHub
  //   )? true: false;
  //   if (!modified) {
  //     for (let idx in this.baseCard.images) {
  //       if (this.baseCard.images[idx].id !== this.card.images[idx].id) modified = true;
  //     }
  //   }
  //   return modified;
  // }

  closeModal() {
    this.activeModal.close();
  }

  save() {
    this.loading = true;
    // if (this.checkRequired()) {
    //   if (this.checkModified()) {
    //     let success:boolean = false;
    //     await this.contentLoader.setProject(
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

    console.log(this.form.value);
    let res = this.contentLoader.updateData(this.form.value as Projects);
    if (res) this.closeModal();

    this.loading = false;
  }

  // cancelEditing() {
  //   this.closeModal();
  //   this.card.id = this.baseCard.id;
  //   this.card.name = this.baseCard.name;
  //   this.card.description = this.baseCard.description;
  //   this.card.date = this.baseCard.date;
  //   this.card.images = [];
  //   this.baseCard.images.forEach(img => this.card.images.push({
  //     id: img.id,
  //     src: img.src
  //   }));
  //   this.card.links.page = this.baseCard.links.page;
  //   this.card.links.gitHub = this.baseCard.links.gitHub;
  // }
}
