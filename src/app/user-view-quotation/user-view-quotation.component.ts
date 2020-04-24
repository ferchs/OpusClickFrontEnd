import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Item } from '../_models/item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsQuotationModalComponent } from '../details-quotation-modal/details-quotation-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProviderQuoteService } from '../_services/provider-quote.service';
import { ProviderQuoteDto } from '../_dtos/providerQuoteDto';
import {Location} from '@angular/common';
import { environment } from '../../environments/environment';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-view-quotation',
  templateUrl: './user-view-quotation.component.html',
  styleUrls: ['./user-view-quotation.component.css']
})
export class UserViewQuotationComponent implements OnInit {

  loading:boolean;
  submited:boolean;
  loggedIn:boolean;
  workId:string;
  providerQuote:ProviderQuoteDto;
  supportPhone:string;
  isUserFirtsService:boolean;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private modalService: NgbModal, private providerQuoteService:ProviderQuoteService,
    private userService:UserService, private location:Location) { 
  }

  ngOnInit() {
    this.providerQuote=new ProviderQuoteDto();
    this.providerQuote.items=new Array();
    this.loading=true;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.workId=params['work'];
    });
    this.loggedIn=this.authService.isLoggedIn();
    this.providerQuoteService.getProviderQuote(this.workId)
    .subscribe((quote:ProviderQuoteDto)=>
    {
      this.providerQuote=quote;
      this.userService.isFirtsService(+localStorage.getItem("id_user")).subscribe(firtsService=>{
        this.isUserFirtsService=firtsService;
        this.loading=false;
      });
      
    });
    this.submited=false;
    this.supportPhone=environment.supportPhone;
  }

  detailsItem(item:Item){
    const modalRef = this.modalService.open(DetailsQuotationModalComponent);
    modalRef.componentInstance.title = 'Detalles de item';
    modalRef.componentInstance.item = item;
  }

  isFirstService(){
    return this.isUserFirtsService;
  }
  
  back(){
    this.location.back();
  }

}
