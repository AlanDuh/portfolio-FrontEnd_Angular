import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Alert } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  alerts:Alert[] = [];
  lastAlert:Alert|undefined;
  toDelete:Alert|undefined;
  private maxAlerts:number = 3;
  private timeToDelete:number = 5000;
  private timeoutArr:any[] = [];
  private subject = new Subject<any>();

  constructor() { }

  addAlert(alert:Alert):void {
    this.alerts.unshift(alert);
    this.timeoutArr.unshift(setTimeout(()=>this.deleteAlert(this.alerts[this.alerts.length - 1], true),this.timeToDelete + 1000 * this.timeoutArr.length));
    this.lastAlert = alert;
    if (this.alerts.length > this.maxAlerts) {
      this.toDelete = this.alerts.pop();
      clearTimeout(this.timeoutArr[this.maxAlerts]);
      this.timeoutArr.pop();
    }
    this.refreshAlerts();
    this.toDelete = undefined;
  }

  deleteAlert(alert:Alert,selfClosed:boolean):void {
    const alertIndex = this.alerts.indexOf(alert);
    clearTimeout(this.timeoutArr[alertIndex]);
    this.timeoutArr.splice(alertIndex, 1);
    if (alertIndex === 0) this.lastAlert = undefined;
    this.alerts.splice(alertIndex, 1);
    if (selfClosed) this.toDelete = alert;
    this.refreshAlerts();
    this.toDelete = undefined;
  }

  refreshAlerts():void {
    this.subject.next({
      alerts: this.alerts,
      lastAlert: this.lastAlert,
      toDelete: this.toDelete
    });
  }

  onChange():Observable<any>{
    return this.subject.asObservable();
  }
}
