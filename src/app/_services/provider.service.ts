import { Injectable } from '@angular/core';
import { ProviderGetProfileDto } from "../_dtos/providerGetProfileDto";
import { ProviderUpdateProfileDto } from "../_dtos/providerUpdateDto";
import { ProviderByProfessionDto} from "../_dtos/providerByProfession";
import { ProviderGetContractReviewDto} from "../_dtos/providerGetContractReviewDto";
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

  getProvider(id:string){
    return this.http.get<ProviderGetProfileDto>(this.apiUrl+"/"+id)
    .pipe(
      map((provider:ProviderGetProfileDto)=> { 
        return provider
      }),
      catchError(this.handleError)
    );
  }

  getProviderReviews(id:string){
    return this.http.get<Array<ProviderGetContractReviewDto>>(this.apiUrl+"/"+id+"/reviews")
    .pipe(
      map((providerReviews:Array<ProviderGetContractReviewDto>)=> { 
        return providerReviews;
      }),
      catchError(this.handleError)
    );
  }

  updateProvider(providerDto:ProviderUpdateProfileDto){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
    return this.http.put(this.apiUrl,providerDto,{headers: headers, observe: 'response', responseType: 'text'})
    .pipe(
      map(response => { return response.status;}),
      catchError(this.handleError)
    );
  }

  setProviderPhoto(file: File, id:number){
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    //const headers = new HttpHeaders({'Content-Type':'multipart/form-data'});          
    //return this.http.post(this.apiUrl+"/images",formdata, {headers: headers, observe: 'response', responseType: 'text'})
    return this.http.post<String>(this.apiUrl+"/"+id+"/images",formdata)
    .pipe(
      map(response => { return response;}),
      catchError(this.handleError)
    );
  }

  getProviderPhoto(id:number){
    return this.http.get(this.apiUrl+"/"+id+"/images", {responseType: "blob"});
  }

  getProvidersByProfession(profession:string){
    let params = new HttpParams().set('profession',profession);
    return this.http.get<ProviderByProfessionDto[]>(this.apiUrl,{params: params});
  }

    private handleError (error: Response) {
      console.log("Se esta manejando un error");
        return Observable.throw(error.status);        
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
}