import { Injectable } from '@angular/core';
import { User } from "../_models/user";
import { UserInformationDto } from "../_dtos/userInformationDto";
import { UserUpdateProfileDto } from "../_dtos/userUpdateDto";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {

  private apiUrl = environment.devApiUrl+"/users";

  constructor(private http: HttpClient) {
  }

  getUser(email:string){
    return this.http.get<UserInformationDto>(this.apiUrl+"/"+email)
    .pipe(
      map((userInfo:UserInformationDto)=> { 
        return userInfo
      }),
      catchError(this.handleError)
    );
  }

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

    setUserPhoto(file: File, email:string){
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

  deleteUserById(id: number): Observable<boolean> {
    return null;
  }

  updateUser(userDto:UserUpdateProfileDto){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
    return this.http.put(this.apiUrl+"/"+userDto.accountEmail,userDto,{headers: headers, observe: 'response', responseType: 'text'})
    .pipe(
      map(response => { return response.status;}),
      catchError(this.handleError)
    );
  }

}