import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form:FormGroup;

  constructor (
    private accountSettings:AccountSettingsService,
    private activeModal:NgbActiveModal,
    private formBuilder:FormBuilder
  ) {
    this.form = this.formBuilder.group(
      {
        username: ['',[Validators.required]],
        password: ['',[Validators.required]]
      }
    )
  }

  closeModal():void {
    this.activeModal.close();
  }

  async verifyData() {
    this.checking = true;
    const tryToLog:boolean = await this.accountSettings.verifyData(this.form.value);
    if (tryToLog) {
      this.activeModal.close();
    }
    this.checking = false;
  }

}
