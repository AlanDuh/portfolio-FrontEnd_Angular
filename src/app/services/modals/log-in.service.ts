import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountSettingsService } from '../account-settings.service';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  modal:any;

  constructor(
    private accountSettings:AccountSettingsService,
    private modalService:NgbModal
  ) { }

  set Modal(modal:any) {
    this.modal = modal;
  }

  async verifyData(data:{name:string,pass:string}):Promise<boolean> {
    return await this.accountSettings.verifyData(data) as boolean;
  }

  openModal() {
    this.modalService.open(this.modal, {backdrop: 'static', keyboard: false});
  }
}
