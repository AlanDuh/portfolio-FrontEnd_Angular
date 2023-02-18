import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OwnerInfo, StoredImage } from 'src/app/interfaces';
import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-about-editor',
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.css']
})
export class AboutEditorComponent implements OnInit {
  baseOwnerInfo?:OwnerInfo;
  title?:string;
  validTitle:boolean = false;
  description?:string;
  validDescription:boolean = false;
  photo?:StoredImage|null;
  photoSrc?:string;
  bannerImages:StoredImage[] = [];
  bannerSrc?:string;
  checking:boolean = false;

  constructor (
    public activeModal: NgbActiveModal,
    private contentService: ContentLoaderService,
    private alertService: AlertsService
  ) {  }

  ngOnInit(): void {
    const ownerInfo: OwnerInfo = this.contentService.ownerInfo as OwnerInfo;
    this.baseOwnerInfo = ownerInfo;
    this.title = ownerInfo.title;
    this.description = ownerInfo.description;
    this.photo = ownerInfo.photo;
    this.photoSrc = ownerInfo.photo?.src;
    ownerInfo.banner.forEach(banner => {
      this.bannerImages.push(banner);
    });
    this.checkTitle();
    this.checkDescription();
  }

  fileInput(event:Event, type:string):void {
    const global = this;
    let file = (event.target as any).files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      switch (type) {
        case 'photo':
          global.photoSrc = reader.result as string;
          break;
        case 'banner':
          global.bannerSrc = reader.result as string;
          break;
        default:
          break;
      }
    };
    reader.onerror = function (error) {
      global.alertService.addAlert({type:'danger',message:'No se ha podido cargar el archivo'});
      console.log('Error: ', error);
    };
  }

  addBannerImage():void {
    if (this.bannerSrc) this.bannerImages.push({
      id: new Date().getTime(),
      src: this.bannerSrc
    });
    else this.alertService.addAlert({type:'warning',message:'Inserte un link o archivo'});
  }

  updateBannerImages(newImages:StoredImage[]):void {
    this.bannerImages = newImages;
  }

  checkTitle():void {
    if (this.title) this.validTitle = true;
    else this.validTitle = false;
  }

  checkDescription():void {
    if (this.description) this.validDescription = true;
    else this.validDescription = false;
  }

  checkBannerIds():boolean {
    let res:boolean = false;
    let baseBanner:StoredImage[] = (this.baseOwnerInfo as OwnerInfo).banner;
    let newBanner:StoredImage[] = this.bannerImages;
    if (baseBanner.length === newBanner.length) {
      for (let imgIdx in newBanner) {
        if (newBanner[imgIdx].id !== baseBanner[imgIdx].id) res = true;
      }
    } else res = true;
    return res;
  }

  async save() {
    this.checking = true;
    if (this.validTitle && this.validDescription) {
      let newOwnerInfo:OwnerInfo = {
        banner: this.bannerImages,
        photo: (this.photoSrc)?
          (
            (!this.photo || (this.photo as StoredImage).src !== this.photoSrc)?
              {
                src:this.photoSrc as string,
                id:new Date().getTime()
              }:
              this.photo as StoredImage
          ):
          null,
        title: this.title as string,
        description: this.description as string
      };
      if (
        this.checkBannerIds() ||
        this.baseOwnerInfo?.photo !== newOwnerInfo.photo ||
        this.baseOwnerInfo?.title !== newOwnerInfo.title ||
        this.baseOwnerInfo?.description !== newOwnerInfo.description
        ) {
        let success:boolean = false;
        await this.contentService.setOwnerInfo(newOwnerInfo).then(value => success = value).catch(err => console.error(err));
        if (success) this.alertService.addAlert({type:'success',message:'Información actualizada correctamente'});
        else this.alertService.addAlert({type:'danger',message:'No se pudo actualizar la información'});
      } else this.alertService.addAlert({type:'warning',message:'No se han realizado cambios'});
      this.activeModal.close();
    } else this.alertService.addAlert({type:'danger',message:'Reyene todos los campos obligatorios'});
    this.checking = false;
  }

}
