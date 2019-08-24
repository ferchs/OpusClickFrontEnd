import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-info-tapiceros',
  templateUrl: './info-tapiceros.component.html',
  styleUrls: ['./info-tapiceros.component.css']
})
export class InfoTapicerosComponent implements OnInit {

  public loggedIn:boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
  }

}
