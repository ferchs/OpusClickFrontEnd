import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-info-soldadores',
  templateUrl: './info-soldadores.component.html',
  styleUrls: ['./info-soldadores.component.css']
})
export class InfoSoldadoresComponent implements OnInit {

  public loggedIn:boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
  }

}
