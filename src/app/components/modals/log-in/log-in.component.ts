import { Component } from '@angular/core';

import { LogInService } from 'src/app/services/modals/log-in.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  nameInput:string = '';
  passInput:string = '';

  constructor (
    private logInService:LogInService,
    private alerts:AlertsService
  ) {}

  async verifyData(modal:any):Promise<void> {
    const tryToLog:boolean = await this.logInService.verifyData({
      name: this.nameInput,
      pass: this.passInput
    });
    if (tryToLog) {
      modal.close();
    }
  }

  setModal(modal:any):void {
    this.logInService.Modal = modal;
    const modalDropper:HTMLElement|null = document.getElementById('modalDropper');
    if (modalDropper) (document.querySelector('app-log-in') as HTMLElement).removeChild(modalDropper);
  }

}
