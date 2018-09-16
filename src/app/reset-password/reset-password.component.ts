import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Response } from '@angular/http/src/static_response';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    
  email: string;
  token:string;
  success:boolean;
  error:boolean;
  mPassword:string;
  mConfirmPassword:string;
  loading:boolean;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private http: HttpClient) { 
  }

  ngOnInit() {
    this.loading=false;
    this.mPassword="";
    this.mConfirmPassword="";
    this.success=false;
    this.error=false;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.email= params['email'];
      this.token = params['verifyCode'];
    });
  }
  
  onSubmit(){
  this.loading=true;
  let password=this.mPassword;
  let matchingPassword=this.mConfirmPassword;
  this.http.post(environment.apiUrlBase+"/resetPassword?email="+this.email+"&verifyCode="+this.token,
  {password,matchingPassword},
  { observe: 'response', responseType: 'text' })
  .subscribe(response => {
    if(response.status === 200){
      this.loading=false;
      this.success=true;
      this.error=false;
    }
  },
  (error:Response)=> {
    this.loading=false;
    this.error=true;    
    this.success=false;
  });    
} 

}
