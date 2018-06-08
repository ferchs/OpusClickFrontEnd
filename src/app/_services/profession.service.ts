import { Injectable } from '@angular/core';
import { Profession } from "../_models/profession";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProfessionService {
    
    private apiUrl = environment.devApiUrl+"/professions";
    
    constructor(private http: HttpClient) {

    }

  getAllProfessions():Observable<Profession[]>{
    return this.http.get<Profession[]>(this.apiUrl);
  }
}