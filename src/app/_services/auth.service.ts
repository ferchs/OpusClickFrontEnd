import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import * as moment from "moment";

interface Token {
    expiresIn: number;
    userId: number;
    providerId: number;
}

@Injectable()
export class AuthService {
    
    constructor(private http: HttpClient) { }
    
    login(email:string, password:string, userLogin:boolean):Observable<number>{
        return this.http.post(environment.loginUrl,{email, password, userLogin},{observe: 'response'})
        .pipe(
            map((res:HttpResponse<Token>) => {  
                this.setSession(res,userLogin);
                return res.status;
            }),
            catchError(this.handleError)
          );
    }

    private handleError (error: Response) {
        console.log("Se esta manejando un error");
          return Observable.throw(error.status);        
      }

    private setSession(authResult:HttpResponse<Token>,userLogin:boolean) {
        const expiresAt = moment().add(authResult.body.expiresIn,'milliseconds');
        localStorage.setItem('id_token', authResult.headers.get('Authorization'));
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        if(userLogin){
            localStorage.setItem("id_user", JSON.stringify(authResult.body.userId.valueOf()));
        }else{
            localStorage.setItem("id_provider", JSON.stringify(authResult.body.providerId.valueOf()));
        }
    }

/*
    login(email:string, password:string, userLogin:boolean) {
        return this.http.post(this.loginUrl,{email, password, userLogin},{observe: 'response'})
        .subscribe((res:HttpResponse<Token>)=> this.setSession(res));
    }

    private setSession(authResult:HttpResponse<Token>) {
        const expiresAt = moment().add(authResult.body.expiresIn,'milliseconds');
        localStorage.setItem('id_token', authResult.headers.get('Authorization'));
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }          
*/
    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("email_user");
        localStorage.removeItem("id_user");
        localStorage.removeItem("email_provider");
        localStorage.removeItem("id_provider");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }   
}