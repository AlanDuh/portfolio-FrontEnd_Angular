import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { LogInService } from 'src/app/services/modals/log-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  loged:boolean = false;
  subscription?:Subscription;

  constructor(
    private accountSettings:AccountSettingsService,
    private logInService:LogInService
  ) {
    this.subscription = accountSettings.onChange().subscribe(value => this.loged = value);
  }

  logOut() {
    this.accountSettings.Loged = false;
  }

  openModal() {
    this.logInService.openModal();
  }
  
}
