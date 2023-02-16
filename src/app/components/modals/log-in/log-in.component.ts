import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountSettingsService } from 'src/app/services/account-settings.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  nameInput:string = '';
  passInput:string = '';
  checking:boolean = false;

  constructor (
    private accountSettings:AccountSettingsService,
    private activeModal:NgbActiveModal
  ) {}

  closeModal():void {
    this.activeModal.close();
  }

  async verifyData() {
    this.checking = true;
    const tryToLog:boolean = await this.accountSettings.verifyData({
      name: this.nameInput,
      pass: this.passInput
    });
    if (tryToLog) {
      this.activeModal.close();
    }
    this.checking = false;
  }

}
