import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { DataService } from "../_services/data.service";
import { AccountService } from '../_services/account.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  resendEmail:boolean;
  confirmationEmailResent:boolean;
  errorMessage:string;
  public loggedIn:boolean;
  previousUrl:string;

  constructor(private authService: AuthService,  private accountService: AccountService,
    private dataService:DataService, private router: Router, 
    private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.loading=true;
    this.previousUrl=null;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.previousUrl=params['redirect'];
      this.loading=false;
    });
    this.loggedIn=this.authService.isLoggedIn();
    this.mEmail="";
    this.mPassword="";
    this.loading=false;
    this.userLogin=true;
    this.error=false;
    this.resendEmail=false;
    this.confirmationEmailResent=false;
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
      if(this.userLogin){
        localStorage.setItem('email_user', this.mEmail);
        this.dataService.changeMessage(this.mEmail);
        if(this.previousUrl==undefined){
          this.router.navigate(['dashboard_usuario/cuenta'])
        }
        else{
          this.router.navigate([this.previousUrl])
        }
      }else{
        localStorage.setItem('email_provider', this.mEmail);
        if(this.previousUrl==null){
          this.router.navigate(['dashboard_experto/cuenta'])
        }
        else{
          this.router.navigate([this.previousUrl])
        }
      }
     },
     error=> {
      this.loading = false;
      if(error===409){
        this.error=true;
        this.confirmationEmailResent=false;
        if(this.userLogin){
          this.errorMessage="Haz click en el boton Expertos para iniciar sesion";
        }
        else{
          this.errorMessage="Haz click en el boton Usuarios para iniciar sesion";
        }
       }
       else if(error===404){
        this.error=false;
        this.emailNotFound=true;
        this.confirmationEmailResent=false;
        this.errorMessage="Email no registrado";
       }
       else if(error===401){
        this.error=false;
        this.resendEmail=true;
        this.confirmationEmailResent=false;
       }
       else {
        this.error=true;
        this.confirmationEmailResent=false;
        this.errorMessage="Email o contraseña incorrecta";
       }
     });
  }

  valuechange(newValue) {
    if(this.emailNotFound){
      this.emailNotFound=false;
    }else if(this.confirmationEmailResent){
      this.confirmationEmailResent=false;
    }else if(this.resendEmail){
      this.resendEmail=false;
    }
  }

  resendConfirmationEmail(){
    this.confirmationEmailResent=true;
    this.resendEmail=false;
    this.emailNotFound=false;
    this.loading = true;
      if(this.userLogin){
        this.accountService.resendConfirmationEmail(this.mEmail, true).subscribe(httpCode => {
          this.loading = false;
          this.confirmationEmailResent=true;
         },
         error=> {
          this.loading = false;
          this.confirmationEmailResent=false;
         });
      }
      else{
        this.accountService.resendConfirmationEmail(this.mEmail, false).subscribe(httpCode => {
          this.loading = false;
          this.confirmationEmailResent=true;
         },
         error=> {
          this.loading = false;
          this.confirmationEmailResent=false;
         });
      }
  }

}