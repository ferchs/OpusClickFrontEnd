import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ContractDto } from "../_dtos/contractDto";
import { ContractGetDto } from "../_dtos/contractGetDto";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ContractService {

    private apiUrl = environment.apiUrlBase+"/contracts";

    constructor(private http: HttpClient) {
    }

    createContract(contract:ContractDto, workId:string):Observable<number>{
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
        return this.http.post(this.apiUrl+"?work="+workId, contract, {headers: headers, observe: 'response', responseType: 'text'})
        .pipe(
          map(response => { return response.status;}),
          catchError(this.handleError)
        );
    }
    
    getContract(id:string){
        return this.http.get<ContractDto>(this.apiUrl+"/"+id)
        .pipe(
          map((contract:ContractDto)=> { 
            return contract;
          }),
          catchError(this.handleError)
        );
    }

    updateContract(contractUpdateDto:ContractGetDto){
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
        return this.http.put(this.apiUrl,contractUpdateDto,{headers: headers, observe: 'response', responseType: 'text'})
        .pipe(
          map(response => { return response.status;}),
          catchError(this.handleError)
        );
      }
    
    updateContractMilestones(contractId:number,chargedContract:ContractGetDto){
        const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});          
        return this.http.put(this.apiUrl+"/"+contractId+"/milestones",chargedContract,{headers: headers, observe: 'response', responseType: 'text'})
        .pipe(
          map(response => { return response.status;}),
          catchError(this.handleError)
        );
      }
    
    private handleError (error: Response) {
        console.log("Se esta manejando un error");
        return Observable.throw(error.status);        
    }
}