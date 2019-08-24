import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-info-carpinteros',
  templateUrl: './info-carpinteros.component.html',
  styleUrls: ['./info-carpinteros.component.css']
})
export class InfoCarpinterosComponent implements OnInit {

  public loggedIn:boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
  }
}
