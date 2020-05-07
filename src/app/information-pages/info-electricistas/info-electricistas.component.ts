import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-info-electricistas',
  templateUrl: './info-electricistas.component.html',
  styleUrls: ['./info-electricistas.component.css']
})
export class InfoElectricistasComponent implements OnInit {

  public loggedIn:boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
  }

}
