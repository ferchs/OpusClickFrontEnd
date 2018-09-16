import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Search } from "../_models/search";

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  saveAnother(newProfession: Search):void{
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
    this.http.post(environment.apiUrlBase+"/searches", newProfession, {headers: headers}).subscribe();
  }
}
