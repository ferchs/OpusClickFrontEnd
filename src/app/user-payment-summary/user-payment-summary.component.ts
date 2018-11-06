import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user-payment-summary',
  templateUrl: './user-payment-summary.component.html',
  styleUrls: ['./user-payment-summary.component.css']
})
export class UserPaymentSummaryComponent implements OnInit {

  loggedIn:boolean;
  transactionState:string;
  billCode:string;
  billValue:string;
  paymentMethod:string;
  now:Date;

  constructor(private authService: AuthService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.now= new Date();
    this.loggedIn=this.authService.isLoggedIn();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.transactionState=params['estado'];
      this.billCode=params['codigoFactura'];
      this.billValue=params['valorFactura'];
      this.paymentMethod=params['medio'];
    });
  }

}
