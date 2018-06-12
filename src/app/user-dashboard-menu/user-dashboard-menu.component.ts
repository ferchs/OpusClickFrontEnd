import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-user-dashboard-menu',
  templateUrl: './user-dashboard-menu.component.html',
  styleUrls: ['./user-dashboard-menu.component.css']
})
export class UserDashboardMenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  toggle(){
    $('.offcanvas-collapse').toggleClass('open');
  }

  exit(){
    this.authService.logout();
    localStorage.removeItem("email_user");
    this.router.navigate(['']);
  }
}
