import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { DataService } from "../_services/data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mEmail: string;
  mPassword: string;
  userLogin:boolean;
  loading:boolean;
  error:boolean;
  emailNotFound:boolean;
  errorMessage:string;
  public loggedIn:boolean;

  constructor(private authService: AuthService, private dataService:DataService, private router: Router) { }
  
  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
    this.mEmail="";
    this.mPassword="";
    this.loading=false;
    this.userLogin=true;
    this.error=false;
    this.emailNotFound=false;
    this.errorMessage="";
  }

  userClick(){
    this.userLogin=true;
  }
  providerClick(){
    this.userLogin=false;
  }

  onSubmit() { 
    this.loading = true;
    this.authService.login(this.mEmail,this.mPassword, this.userLogin).subscribe(httpCode => {
      this.loading = false;
      this.error=false;
      this.dataService.changeMessage(this.mEmail);
      if(this.userLogin){
        this.router.navigate(['dashboard_usuario'])
      }else{
        this.router.navigate(['dashboard_experto'])
        localStorage.setItem('email_provider', this.mEmail);
      }
     },
     error=> {
      this.loading = false;
      if(error===409){
        this.error=true;
        if(this.userLogin){
          this.errorMessage="Email no asociado al rol usuario";
        }
        else{
          this.errorMessage="Email no asociado al rol experto";
        }
       }
       else if(error===404){
        this.error=false;
        this.emailNotFound=true;
        this.errorMessage="Email no registrado";
       }
       else if(error===401){
        this.error=true;
        this.errorMessage="Debes confirmar tu cuenta para iniciar sesion. ¡Revisa tu Email!";
       }
       else {
        this.error=true;
        this.errorMessage="Email o contraseña incorrecta";
       }

     });
  }

  valuechange(newValue) {
    if(this.emailNotFound===true){
      this.emailNotFound=false;
    }
  }

}
