import { Component, Input, Output, EventEmitter } from '@angular/core';

import { StoredImage } from 'src/app/interfaces';

@Component({
  selector: 'app-thumbnail-container',
  templateUrl: './thumbnail-container.component.html',
  styleUrls: ['./thumbnail-container.component.css']
})
export class ThumbnailContainerComponent {

  @Input() bannerImages:StoredImage[] = [];
  @Output() updateBannerImages = new EventEmitter<StoredImage[]>();

  moveForward(th:StoredImage):void {
    let thIndex:number = this.bannerImages.indexOf(th);
    if (thIndex > 0) {
      let complementaryTh:StoredImage = this.bannerImages[thIndex - 1];
      this.bannerImages[thIndex - 1] = th;
      this.bannerImages[thIndex] = complementaryTh;
      this.updateBannerImages.emit(this.bannerImages);
    }
  }

  moveBackward(th:StoredImage):void {
    let thIndex:number = this.bannerImages.indexOf(th);
    if (thIndex < this.bannerImages.length - 1) {
      let complementaryTh:StoredImage = this.bannerImages[thIndex + 1];
      this.bannerImages[thIndex + 1] = th;
      this.bannerImages[thIndex] = complementaryTh;
      this.updateBannerImages.emit(this.bannerImages);
    }
  }

  deleteThumnail(th:StoredImage):void {
    this.bannerImages.splice(this.bannerImages.indexOf(th), 1);
    this.updateBannerImages.emit(this.bannerImages);
  }

}
