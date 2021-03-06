import { Injectable } from '@angular/core';
import { Account } from "../_models/account";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ProviderRegistrationDto } from "../_dtos/providerRegistrationDto";
import { ResendEmailDto } from "../_dtos/resendEmailDto";
import { UserRegistrationDto } from "../_dtos/userRegistrationDto";
import 'rxjs/add/observable/throw';

@Injectable()
export class AccountService {

  private apiUrl = environment.apiUrlBase+"/accounts";

  constructor(private http: HttpClient) {
  }

  createUserAccount(user: UserRegistrationDto):Observable<number>{
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
    return this.http.post(this.apiUrl+"/user", user, {headers: headers, observe: 'response', responseType: 'text'})
    .pipe(
      map(response => { return response.status;}),
      catchError(this.handleError)
    );
    }

    createProviderAccount(provider: ProviderRegistrationDto):Observable<number>{
      const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
      return this.http.post(this.apiUrl+"/provider", provider, {headers: headers, observe: 'response', responseType: 'text'})
      .pipe(
        map(response => { return response;}),
        catchError(this.handleError)
      );
      }

    resendConfirmationEmail(email:string, isUser:boolean ){
      let resendEmailDto = new ResendEmailDto();
      resendEmailDto.email=email;
      if(isUser){
        resendEmailDto.isUser=true;
      } else{
        resendEmailDto.isUser=false;
      }
      const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
      return this.http.post(environment.apiUrlBase+"/resendConfirmationEmail", resendEmailDto, {headers: headers, observe: 'response', responseType: 'text'})
      .pipe(
        map(response => { return response;}),
        catchError(this.handleError)
      );
    }

    private handleError (error: Response) {
      console.log("Se esta manejando un error");
        return Observable.throw(error);        
    }
}