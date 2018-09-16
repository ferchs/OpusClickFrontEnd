import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {

  token:string;
  type:string;
  email:string;  
  sucess:boolean;
  expired:boolean;
  error:boolean;
  loading:boolean;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private http: HttpClient) { }

  ngOnInit() {
    this.loading=true;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.type = params['type']; 
      this.token = params['verifyCode'];
      this.sucess=false;
      this.expired=false;
      this.error=false;
    });
    this.http.get(environment.apiUrlBase+"/registrationConfirm?type="+this.type+"&verifyCode="+this.token,{ observe: 'response', responseType: 'text' })
    .subscribe(response => {
      if(response.status === 200){
        this.sucess=true;
        this.loading=false;
      }
    },
    (error:Response)=> {
      if(error.status === 401){
        this.expired=true;
        this.loading=false;
      }
      else{
        this.error=true;
        this.loading=false;
      }
    });
  }

}
