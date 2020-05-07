import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-info-pintores',
  templateUrl: './info-pintores.component.html',
  styleUrls: ['./info-pintores.component.css']
})
export class InfoPintoresComponent implements OnInit {

  public loggedIn:boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
  }

}
