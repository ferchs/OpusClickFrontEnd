import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Item } from '../_models/item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsQuotationModalComponent } from '../details-quotation-modal/details-quotation-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContractService } from '../_services/contract.service';
import { ContractGetDto } from '../_dtos/contractGetDto';
import { MilestoneGetDto } from '../_dtos/milestoneGetDto';
import {Location} from '@angular/common';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-user-approve-payment',
  templateUrl: './user-approve-payment.component.html',
  styleUrls: ['./user-approve-payment.component.css']
})
export class UserApprovePaymentComponent implements OnInit {

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
    private modalService: NgbModal, private contractService:ContractService, private router: Router,
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
    this.selected=true;
    this.hideNotification=true;
  }

  detailsItem(item:Item){
    const modalRef = this.modalService.open(DetailsQuotationModalComponent);
    modalRef.componentInstance.title = 'Detalles de item';
    modalRef.componentInstance.item = item;
  }

  approvePayment(milestone:MilestoneGetDto){
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = '¿Estas seguro de aprobar este pago?';
    modalRef.componentInstance.content = 'Si apruebas, estarás autorizando realizar el pago al experto';
    modalRef.componentInstance.result.subscribe(response=>{
      if(response==true){
        milestone.state="PAID_OUT";
        this.contractService.updateContractMilestones(+this.contractId,this.contract).subscribe(response=>{
          this.contractService.getContract(this.contractId).subscribe((contract:ContractGetDto)=>
          {
            this.contract=contract;
            this.loading=false;
            this.notificationMessage="¡Se ha realizado el pago exitosamente!";
            this.notificationType="success";
            this.hideNotification=false;
            if(this.proceedToQualify()){
              this.router.navigate(['calificar'],{ queryParams: { work: this.contract.workId } })
            }
          });
        });
      }
    });
  }

  denyPayment(milestone:MilestoneGetDto){
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = '¿Estas seguro de denegar este pago?';
    modalRef.componentInstance.content = 'Si tienes algún problema con este trabajo, llámanos o escribenos al (321)-832-37-68';
    modalRef.componentInstance.result.subscribe(response=>{
      if(response==true){
        milestone.state="DENIED";
        this.contractService.updateContractMilestones(+this.contractId,this.contract).subscribe(response=>{
          this.contractService.getContract(this.contractId).subscribe((contract:ContractGetDto)=>
            {
              this.contract=contract;
              this.loading=false;
              this.notificationMessage="¡Se ha denegado el pago del item!";
              this.notificationType="info";
              this.hideNotification=false;
              if(this.proceedToQualify()){
                this.router.navigate(['calificar', {work: this.contract.workId}])
              }
            });
          });
      }
    });
  }


  proceedToQualify(){
    let qualify:boolean=true;
    for (let milestone of this.contract.milestones) {
      if(milestone.state=="IN_PROGRESS" || milestone.state=="FINALIZED"){
        qualify=false;
      }
    }
    return qualify;
  }

  back(){
    this.location.back();
  }

}
