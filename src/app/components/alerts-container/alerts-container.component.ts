import { Component, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

import { AlertsService } from 'src/app/services/alerts.service';
import { Alert } from 'src/app/interfaces';

@Component({
  selector: 'app-alerts-container',
  templateUrl: './alerts-container.component.html',
  styleUrls: ['./alerts-container.component.css']
})
export class AlertsContainerComponent {

  alerts:Alert[] = [];
  lastAlert:Alert|undefined;
  toDeleteMd:Alert|undefined;
  toDeleteSm:Alert|undefined;
  @ViewChild('_toDeleteMd', {static: false}) _toDeleteMd?: NgbAlert;
  @ViewChild('_toDeleteSm', {static: false}) _toDeleteSm?: NgbAlert;
  subscription?:Subscription;

  constructor (
    public alertsService:AlertsService
  ) {
    this.subscription = alertsService.onChange().subscribe(value => {
      this.alerts = value.alerts;
      this.lastAlert = value.lastAlert;
      this.toDeleteMd = value.toDelete;
      this.toDeleteSm = value.toDelete;
      setTimeout(() => {
        this._toDeleteMd?.close();
        this._toDeleteSm?.close();
      }, 100);
    });
  }

}
