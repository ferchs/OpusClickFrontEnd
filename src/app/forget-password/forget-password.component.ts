import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  mEmail: string;
  sucess:boolean;
  notFound:boolean;
  error:boolean;
  loading:boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.mEmail="";
    this.sucess=false;
    this.notFound=false;
    this.error=false;
    this.loading=false;
  }

  onSubmit(){
    this.loading = true;
    let email=this.mEmail;
    console.log(email);
    this.http.post(environment.apiUrlBase+"/sendResetPasswordEmail",email,{ observe: 'response', responseType: 'text' })
    .subscribe(response => {
      this.loading = false;
      if(response.status === 200){
        this.sucess=true;
        this.error=false;
        this.notFound=false;
      }
    },
    (error:Response)=> {
      this.loading = false;
      if(error.status === 404){
        this.notFound=true;
        this.sucess=false;
        this.error=false;
      }
      else{
        this.error=true;
        this.notFound=false;
        this.sucess=false;
      }
    });
  }
}
