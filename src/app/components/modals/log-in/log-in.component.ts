import { Component } from '@angular/core';

import { LogInService } from 'src/app/services/modals/log-in.service';

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
    private logInService:LogInService,
  ) {}

  async verifyData(modal:any):Promise<void> {
    this.checking = true;
    const tryToLog:boolean = await this.logInService.verifyData({
      name: this.nameInput,
      pass: this.passInput
    });
    if (tryToLog) {
      modal.close();
    }
    this.checking = false;
  }

  setModal(modal:any):void {
    this.logInService.Modal = modal;
    const modalDropper:HTMLElement|null = document.getElementById('modalDropper');
    if (modalDropper) (document.querySelector('app-log-in') as HTMLElement).removeChild(modalDropper);
  }

}
