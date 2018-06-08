import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-provider-dashboard-menu',
  templateUrl: './provider-dashboard-menu.component.html',
  styleUrls: ['./provider-dashboard-menu.component.css']
})
export class ProviderDashboardMenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  toggle(){
    $('.offcanvas-collapse').toggleClass('open');
  }

  exit(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}
