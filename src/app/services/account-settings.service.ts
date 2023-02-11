import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  private loged:boolean = false;
  private subject = new Subject<any>();
  private adaminSettingsUrl:string = 'http://localhost:5000/adminSettings';

  constructor(
    private http:HttpClient,
    private alerts:AlertsService
  ) { }

  set Loged(newStatus:boolean) {
    (newStatus)?this.alerts.addAlert({type:'success', message:'Sesión iniciada correctamente'}):this.alerts.addAlert({type:'warning', message:'Haz cerrado sesión'});
    this.loged = newStatus;
    this.subject.next(this.loged);
  }

  async verifyData(data:{name:string,pass:string}):Promise<boolean> {
    let value = new Promise((resolve) => {
        this.getAdminSettings().subscribe(settings=>{
          settings.accounts.forEach(account => {
            if (account.name === data.name && account.pass === data.pass) resolve(true);
          });
          resolve(false);
        });
      }
    )
    const verified:boolean = await value as boolean;
    if (verified) this.Loged = true;
    else this.alerts.addAlert({type:'danger', message:'Nombre y/o contraseña incorrecta'});
    return verified;
  }

  getAdminSettings():Observable<{accounts:{name:string,pass:string}[]}> {
    return this.http.get<{accounts:{name:string,pass:string}[]}>(this.adaminSettingsUrl);
  }

  onChange():Observable<any>{
    return this.subject.asObservable();
  }
}
