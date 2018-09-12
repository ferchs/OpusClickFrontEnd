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
  selector: 'app-provider-request-payment',
  templateUrl: './provider-request-payment.component.html',
  styleUrls: ['./provider-request-payment.component.css']
})
export class ProviderRequestPaymentComponent implements OnInit {

  loading:boolean;
  loggedIn:boolean;
  contractId:string;
  contract:ContractGetDto;
  selected:boolean;
  chargedContract:ContractGetDto;
  hideNotification:boolean;
  notificationMessage:string;
  notificationType:string;

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
    this.hideNotification=true;
  }

  detailsItem(item:Item){
    const modalRef = this.modalService.open(DetailsQuotationModalComponent);
    modalRef.componentInstance.title = 'Detalles de item';
    modalRef.componentInstance.item = item;
  }

  verifySelectedItems(){
    for (let milestone of this.contract.milestones) {
      if(milestone.item.selected==true){
        return true;
      }
    }
    return false;
  }

  requestPayment(){
    if(this.verifySelectedItems()){
      this.selected=true;
      this.chargedContract= new ContractGetDto();
      this.chargedContract= this.contract;
      this.loading=true;
      for (let milestone of this.chargedContract.milestones) {
        if(milestone.item.selected==true){
          milestone.state="FINALIZED";
        }
      }
      this.contractService.updateContractMilestones(this.contract.id,this.chargedContract).subscribe(res=>{
        this.contractService.getContract(this.contractId).subscribe((contract:ContractGetDto)=>
        {
          this.contract=contract;
          this.loading=false;
          this.notificationMessage="¡Se ha solicitado el pago, debes esperar a que el cliente lo apruebe!";
          this.notificationType="info";
          this.hideNotification=false;
        });
      });
    }else{
      this.selected=false;
    }
  }

  back(){
    this.location.back();
  }

  disableRequestPayment(){
    let disable:boolean=false;
    if(this.contract.state=="FINALIZED"){
      disable=true;
    }
    return disable;
  }
}
