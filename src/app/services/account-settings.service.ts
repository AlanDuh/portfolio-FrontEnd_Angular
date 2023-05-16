import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { AlertsService } from './alerts.service';
import { Account } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountSettingsService {

  private loged:boolean = false;
  private subject = new Subject<any>();
  private adaminSettingsUrl:string = 'https://portfolio-backend-f91r.onrender.com/account/tryToLog';

  constructor(
    private http:HttpClient,
    private alerts:AlertsService
  ) { }

  set Loged(newStatus:boolean) {
    (newStatus)?this.alerts.addAlert({type:'success', message:'Sesión iniciada correctamente'}):this.alerts.addAlert({type:'warning', message:'Haz cerrado sesión'});
    this.loged = newStatus;
    this.subject.next(this.loged);
  }

  async verifyData(data:Account):Promise<boolean> {
    let value = new Promise((resolve) => {
        this.getAdminSettings(data).subscribe(res=>{
          if (res !== null) {
            sessionStorage.setItem('Authorization', res.token);

            console.log(res);

            setTimeout(() => {
              sessionStorage.removeItem('Authorisation');
              this.Loged = false;
            }, res.exp);
            resolve(true);
          } else resolve(false);
        });
      }
    )
    const verified:boolean = await value as boolean;
    if (verified) this.Loged = true;
    else this.alerts.addAlert({type:'danger', message:'Nombre y/o contraseña incorrecta'});
    return verified;
  }

  getAdminSettings(acc:Account):Observable<{token:string, exp:number}|null> {
    return this.http.post<{token:string, exp:number}|null>(this.adaminSettingsUrl, acc);
  }

  onChange():Observable<any>{
    return this.subject.asObservable();
  }
}
