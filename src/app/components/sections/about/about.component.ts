import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { AboutEditorComponent } from '../../modals/about-editor/about-editor.component';
import { StoredImage } from 'src/app/interfaces';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() loading:boolean = false;
  bannerImages:StoredImage[] = [];
  photo:StoredImage|null = null;
  title:string = '';
  description:string = '';

  loged:boolean = false;

  contentSubscription?: Subscription;
  accountSubscription?: Subscription;
  
  constructor (
    private contentLoader:ContentLoaderService,
    private accountSettings:AccountSettingsService,
    private modalService:NgbModal
  ) {
    this.contentSubscription = contentLoader.onOwnerInfoChange().subscribe(ownerInfo=>{
      this.bannerImages = [];
      ownerInfo.banner.forEach(img=>this.bannerImages.push(img));
      this.photo = ownerInfo.photo;
      this.title = ownerInfo.title;
      this.description = ownerInfo.description;
    });
    this.accountSubscription = accountSettings.onChange().subscribe(value=>this.loged=value);
  }

  ngOnInit(): void {
    this.contentLoader.getDbOwnerInfo();
  }

  // Modal display
  openModal() {
    const modal = this.modalService.open(AboutEditorComponent, {backdrop: 'static', keyboard: false});
    modal.hidden.subscribe(()=>(document.querySelector('body') as HTMLElement).style.overflow = '');
  }

}
