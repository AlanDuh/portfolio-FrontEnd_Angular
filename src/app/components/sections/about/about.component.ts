import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ContentLoaderService } from 'src/app/services/content-loader.service';
import { AccountSettingsService } from 'src/app/services/account-settings.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  bannerImages:string[] = [];
  photo:string|null = null;
  title:string = '';
  description:string = '';

  loged:boolean = false;

  contentSubscription?: Subscription;
  accountSubscription?: Subscription;
  
  constructor (
    private contentLoader:ContentLoaderService,
    private accountSettings:AccountSettingsService
  ) {
    this.contentSubscription = contentLoader.onOwnerInfoChange().subscribe(ownerInfo=>{
      this.bannerImages = [];
      ownerInfo.banner.forEach(img=>this.bannerImages.push(img.Src));
      this.photo = ownerInfo.photo;
      this.title = ownerInfo.title;
      this.description = ownerInfo.description;
    });
    this.accountSubscription = accountSettings.onChange().subscribe(value=>this.loged=value);
  }

  ngOnInit(): void {
    this.contentLoader.getDbOwnerInfo();
  }

  comprobar() {
    console.log('hola');
  }

}
