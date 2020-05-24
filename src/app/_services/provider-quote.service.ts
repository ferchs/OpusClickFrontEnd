import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProviderQuoteDto } from "../_dtos/providerQuoteDto";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { OnlineQuoteGetDto } from "../_dtos/onlineQuoteGetDto";

@Injectable()
export class ProviderQuoteService {

    private apiUrl = environment.apiUrlBase+"/provider_quotes";
    private onlinequotes = environment.apiUrlBase+"/online_quotes";
    
    constructor(private http: HttpClient) {
    }

    createProviderQuote(providerQuote:ProviderQuoteDto, workId:string):Observable<number>{
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
        return this.http.post(this.apiUrl+"?work="+workId, providerQuote, {headers: headers, observe: 'response', responseType: 'text'})
        .pipe(
          map(response => { return response.status;}),
          catchError(this.handleError)
        );
    }
    
    getProviderQuote(id:string){
        return this.http.get<ProviderQuoteDto>(this.apiUrl+"/"+id)
        .pipe(
          map((quoteInfo:ProviderQuoteDto)=> { 
            return quoteInfo
          }),
          catchError(this.handleError)
        );
      }

      getQuote(id:number){
        return this.http.get<OnlineQuoteGetDto>(this.onlinequotes+"/"+id)
        .pipe(
          map((quoteInfo:OnlineQuoteGetDto)=> { 
            return quoteInfo
          }),
          catchError(this.handleError)
        );
      }

    private handleError (error: Response) {
        console.log("Se esta manejando un error");
        return Observable.throw(error.status);        
    }
}