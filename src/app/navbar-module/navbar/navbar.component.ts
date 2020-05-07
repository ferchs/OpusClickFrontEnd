import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() loggedIn: Boolean;

  constructor(private authService: AuthService, private router: Router) { 

  }

  ngOnInit() {
    console.log("Se llama al metodo onInit de navbar");
  }

  goToDashboard(){
    if(localStorage.getItem("email_provider")!=null){
      this.router.navigate(['/dashboard_experto/cuenta']);
    }
    else{
      this.router.navigate(['/dashboard_usuario/cuenta']);
    }
  }

  exit(){
    this.authService.logout();
    this.router.navigate(['']);
    this.loggedIn=false;
  }

}
