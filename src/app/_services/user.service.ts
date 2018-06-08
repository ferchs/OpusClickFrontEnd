import { Injectable } from '@angular/core';
import { User } from "../_models/user";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  private apiUrl = environment.devApiUrl+"/v1/accounts";

  constructor(private http: HttpClient) {
  }

  //findAll(): Observable<User[]>  {
    //return this.http.get(this.apiUrl)
      //.map((res:Response) => res.json())
      //.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  //}

  findById(id: number): Observable<User> {
    return null;
  }

   //.map(response => {
            //return response.status;
            //}
          //,
          //(err: HttpErrorResponse) => {
          //
          //}
  createUser(user: User):Observable<number>{
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
    return this.http.post(this.apiUrl, user, {headers: headers, observe: 'response', responseType: 'text'})
    .pipe(
      map(response => { return response.status;}),
      catchError(this.handleError)
    );
    }

    private handleError (error: Response) {
      console.log("Se esta manejando un error");
        return Observable.throw(error.status);        
    }

  deleteUserById(id: number): Observable<boolean> {
    return null;
  }

  updateUser(user: User): Observable<User> {
    return null;
  }

}