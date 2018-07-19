import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { VisitScheduleDto } from "../_dtos/visitScheduleDto";
import { VisitGetDto } from "../_dtos/visitGetDto";
import { visitUpdateDto} from "../_dtos/visitUpdateDto";
import { visitUpdateStateDto} from "../_dtos/visitUpdateStateDto";
import { State } from "../_models/state";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VisitService {

  private apiUrl = environment.devApiUrl+"/visits";

  constructor(private http: HttpClient) { }

  createVisit(dto: VisitScheduleDto, userId?:string, providerId?:string, workId?:string){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'}); 
    if(userId!=null && providerId!=null){
      return this.http.post(this.apiUrl+"?user="+userId+"&provider="+providerId, dto, {headers: headers, observe: 'response', responseType: 'text'})
      .pipe(
        map(response => { return response}),
        catchError(this.handleError)
      );
    }else{
      return this.http.post(this.apiUrl+"?work="+workId, dto, {headers: headers, observe: 'response', responseType: 'text'})
      .pipe(
        map(response => { return response}),
        catchError(this.handleError)
      );
    }
    }

    private handleError (error: Response) {
      console.log("Se esta manejando un error");
        return Observable.throw(error.status);        
    }

  getVisit(rol?:string, id?:string, work?:string, state?:string){
    if(work!=null){
      let params = new HttpParams()
                    .set('rol',rol)
                    .set('id',id)
                    .set('work',work)
                    .set('state',state);
    return this.http.get<VisitGetDto[]>(this.apiUrl,{params: params});
    }
    else{
      let params = new HttpParams()
                    .set('rol',rol)
                    .set('id',id)
                    .set('state',state);
    return this.http.get<VisitGetDto[]>(this.apiUrl,{params: params});
    }
  }

  updateVisit(visitDto:visitUpdateDto){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
    return this.http.put(this.apiUrl,visitDto,{headers: headers, observe: 'response', responseType: 'text'})
    .pipe(
      map(response => { return response.status;}),
      catchError(this.handleError)
    );
  }

  updateVisitState(visitStateDto:visitUpdateStateDto){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
    return this.http.put(this.apiUrl+"/states",visitStateDto,{headers: headers, observe: 'response', responseType: 'text'})
    .pipe(
      map(response => { return response.status;}),
      catchError(this.handleError)
    );
  }
}
