import { Injectable } from '@angular/core';
import { City } from "../_models/city";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import 'rxjs/add/observable/throw';

@Injectable()
export class CityService {
    
    private apiUrl = environment.devApiUrl+"/cities";
    
    constructor(private http: HttpClient) {

    }

  getAllCities():Observable<City[]>{
    return this.http.get<City[]>(this.apiUrl);
  }

}