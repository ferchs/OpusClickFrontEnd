import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-info-albaniles',
  templateUrl: './info-albaniles.component.html',
  styleUrls: ['./info-albaniles.component.css']
})
export class InfoAlbanilesComponent implements OnInit {

  public loggedIn:boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
  }

}
