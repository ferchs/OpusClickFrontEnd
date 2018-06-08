import { Injectable } from '@angular/core';
import { Provider } from "../_models/provider";
import { ProviderUpdateProfileDto } from "../_dtos/providerUpdateDto";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProviderService {
  
  private apiUrl = environment.devApiUrl+"/providers";


  constructor(private http: HttpClient) {
  }

  getProviderInfo(email:string){
    return this.http.get<Provider>(this.apiUrl+"/"+email)
    .pipe(
      map((provider:Provider)=> { 
        return provider
      }),
      catchError(this.handleError)
    );
  }

  updateProvider(providerDto:ProviderUpdateProfileDto){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
    return this.http.put(this.apiUrl+"/"+providerDto.email,providerDto,{headers: headers, observe: 'response', responseType: 'text'})
    .pipe(
      map(response => { return response.status;}),
      catchError(this.handleError)
    );
  }

  setProviderPhoto(file: File, email:string){
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    //const headers = new HttpHeaders({'Content-Type':'multipart/form-data'});          
    //return this.http.post(this.apiUrl+"/images",formdata, {headers: headers, observe: 'response', responseType: 'text'})
    let params = new HttpParams().set('email',email);
    return this.http.post<String>(this.apiUrl+"/images",formdata, {params: params})
    .pipe(
      map(response => { return response;}),
      catchError(this.handleError)
    );
  }

  getProviderPhoto(email:string){
    return this.http.get(this.apiUrl+"/"+email+"/images", {responseType: "blob"});
    /*return this.http.get<Blob>(this.apiUrl+"/"+id+"/images")
    .pipe(
      map((photo:Blob)=> { 
        return photo;
      }),
      catchError(this.handleError)
    );*/
  }

  /*
  getProviderInfo(id:string){
    let idParam = new HttpParams().set('id', id);
    return this.http.get<Provider>(this.apiUrl,{ params: idParam })
    .pipe(
      map((provider:Provider)=> { 
        return provider
      }),
      catchError(this.handleError)
    );
  }
*/
    private handleError (error: Response) {
      console.log("Se esta manejando un error");
        return Observable.throw(error.status);        
    }
}