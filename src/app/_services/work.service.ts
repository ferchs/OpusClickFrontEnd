import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { WorkGetDto } from "../_dtos/workGetDto";
import { WorkUpdateDto } from "../_dtos/workUpdateDto";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkService {

    private apiUrl = environment.apiUrlBase+"/works";

    constructor(private http: HttpClient) { }

    getWorkById(id:string){
      return this.http.get<WorkGetDto>(this.apiUrl+"/"+id)
      .pipe(
        map((work:WorkGetDto)=> { 
          return work;
        }),
        catchError(this.handleError)
      );
    }

    getWork(rol?:string, id?:string, state?:string){
        let params = new HttpParams()
            .set('rol',rol)
            .set('id',id)
            .set('state',state);
        return this.http.get<WorkGetDto[]>(this.apiUrl,{params: params});
      }
    

      private handleError (error: Response) {
        console.log("Se esta manejando un error");
          return Observable.throw(error.status);        
      }

      updateWork(workUpdateDto:WorkUpdateDto){
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
        return this.http.put(this.apiUrl,workUpdateDto,{headers: headers, observe: 'response', responseType: 'text'})
        .pipe(
          map(response => { return response.status;}),
          catchError(this.handleError)
        );
      }

}