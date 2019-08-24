import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-info-plomeros',
  templateUrl: './info-plomeros.component.html',
  styleUrls: ['./info-plomeros.component.css']
})
export class InfoPlomerosComponent implements OnInit {

  public loggedIn:boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
  }

}
