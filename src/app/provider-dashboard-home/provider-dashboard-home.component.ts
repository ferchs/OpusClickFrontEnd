import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-provider-dashboard-home',
  templateUrl: './provider-dashboard-home.component.html',
  styleUrls: ['./provider-dashboard-home.component.css']
})
export class ProviderDashboardHomeComponent implements OnInit {

  supportPhone:string;

  constructor() { }

  ngOnInit() {
    this.supportPhone=environment.supportPhone;
  }

}
