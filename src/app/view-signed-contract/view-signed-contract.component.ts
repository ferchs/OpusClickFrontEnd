import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Item } from '../_models/item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsQuotationModalComponent } from '../details-quotation-modal/details-quotation-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContractService } from '../_services/contract.service';
import { ContractGetDto } from '../_dtos/contractGetDto';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-signed-contract',
  templateUrl: './view-signed-contract.component.html',
  styleUrls: ['./view-signed-contract.component.css']
})
export class ViewSignedContractComponent implements OnInit {
  
  loading:boolean;
  submited:boolean;
  loggedIn:boolean;
  contractId:string;
  contract:ContractGetDto;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private modalService: NgbModal, private contractService:ContractService,
    private location:Location) { 
  }

  ngOnInit() {
    this.contract=new ContractGetDto();
    this.contract.milestones=new Array();
    this.loading=true;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.contractId=params['contract'];
    });
    this.loggedIn=this.authService.isLoggedIn();
    this.contractService.getContract(this.contractId)
    .subscribe((contract:ContractGetDto)=>
    {
      this.contract=contract;
      this.loading=false;
    });
    this.submited=false;
  }

  detailsItem(item:Item){
    const modalRef = this.modalService.open(DetailsQuotationModalComponent);
    modalRef.componentInstance.title = 'Detalles de item';
    modalRef.componentInstance.item = item;
  }

  isFirstService(){
    if((this.contract.subtotal+this.contract.administrationFee)!=this.contract.totalValue){
      return true;
    }else{
      return false;
    }
  }
  
  back(){
    this.location.back();
  }
}
