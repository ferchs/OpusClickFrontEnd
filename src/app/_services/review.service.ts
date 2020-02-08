import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ReviewDto } from '../_dtos/reviewDto';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ReviewImageUpdateDto } from '../_dtos/reviewImageUpdateDto';

@Injectable()
export class ReviewService {

    private apiUrl = environment.apiUrlBase+"/reviews";

    constructor(private http: HttpClient) { }

    createReview(reviewDto:ReviewDto, workId:string):Observable<number>{
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
        return this.http.post(this.apiUrl+"?work="+workId, reviewDto, {headers: headers, observe: 'response', responseType: 'text'})
        .pipe(
          map(response => { return response.status;}),
          catchError(this.handleError)
        );
    }

    updateReviewImage(file: File, id:number){
      let formdata: FormData = new FormData();
      formdata.append('file', file);
      //const headers = new HttpHeaders({'Content-Type':'multipart/form-data'});          
      //return this.http.post(this.apiUrl+"/images",formdata, {headers: headers, observe: 'response', responseType: 'text'})
      return this.http.put<String>(this.apiUrl+"/"+id+"/image",formdata)
      .pipe(
        map(response => { return response;}),
        catchError(this.handleError)
      );
    }

      private handleError (error: Response) {
        console.log("Se esta manejando un error");
          return Observable.throw(error.status);        
      }

}