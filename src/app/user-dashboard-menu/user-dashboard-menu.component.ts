import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-user-dashboard-menu',
  templateUrl: './user-dashboard-menu.component.html',
  styleUrls: ['./user-dashboard-menu.component.css']
})
export class UserDashboardMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggle(){
    $('.offcanvas-collapse').toggleClass('open');
  }
}
