import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountSettingsService } from 'src/app/services/account-settings.service';
import { LogInComponent } from '../modals/log-in/log-in.component';

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
    private modalService:NgbModal
  ) {
    this.subscription = accountSettings.onChange().subscribe(value => this.loged = value);
  }

  logOut() {
    this.accountSettings.Loged = false;
  }

  // Modal display
  openModal() {
    this.modalService.open(LogInComponent, {backdrop: 'static', keyboard: false});
  }
  
}
