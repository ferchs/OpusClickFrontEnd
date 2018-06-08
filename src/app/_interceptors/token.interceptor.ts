import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem("id_token")){
      request = request.clone({headers: request.headers.set('Authorization', localStorage.getItem("id_token"))}); 
      return next.handle(request);      
    }
    else{
    return next.handle(request);
    }
  }
}