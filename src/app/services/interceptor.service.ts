import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  private getToken():string {

    return sessionStorage.getItem('Authorization') as string;

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    req = req.clone(
      {
        setHeaders: {
          Authorization: this.getToken()
        }
      }
    )

    console.log(this.getToken());

    return next.handle(req);

  }

}
