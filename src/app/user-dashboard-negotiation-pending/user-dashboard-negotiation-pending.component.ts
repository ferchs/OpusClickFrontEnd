import { Component, OnInit } from '@angular/core';
import { WorkGetDto} from "../_dtos/workGetDto";
import { WorkService } from "../_services/work.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkUpdateDto } from "../_dtos/workUpdateDto";
import { DetailsWorkModalComponent } from '../details-work-modal/details-work-modal.component';
import { NoAgreementModalComponent } from '../no-agreement-modal/no-agreement-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { PaymentService } from '../_services/payment.service';
import { ContractService } from '../_services/contract.service';
import { Router } from '@angular/router';
import { ContractGetDto } from '../_dtos/contractGetDto';

@Component({
  selector: 'app-user-dashboard-negotiation-pending',
  templateUrl: './user-dashboard-negotiation-pending.component.html',
  styleUrls: ['./user-dashboard-negotiation-pending.component.css']
})
export class UserDashboardNegotiationPendingComponent implements OnInit {

  worksList:string="PENDING_BY_QUOTATION,QUOTE_MADE,CONTRACT_MODIFIED_BY_PROVIDER,CONTRACT_MODIFIED_BY_USER,CONTRACT_ACCEPTED_BY_PROVIDER,PENDING_BY_PAYMENT";
  pendingWorks:WorkGetDto[];
  loading:boolean;
  hideNotification:boolean;
  notificationMessage:string;
  notificationType:string;
  now:Date;

  constructor(private workService:WorkService,
    private paymentService:PaymentService,
    private contractService:ContractService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.loading=true;
    this.pendingWorks=null;
    this.hideNotification=true;
    this.workService.getWork("user",localStorage.getItem("id_user"),this.worksList).subscribe((works:WorkGetDto[])=>{
      this.pendingWorks=works;
      this.loading=false;
      this.now= new Date();
    });
  }

  newLabelChange(event,work) {
    let dto:WorkUpdateDto = new WorkUpdateDto();
    dto.id=work.id;
    dto.providerLabel=work.providerLabel;
    dto.state="LABEL_CHANGE";
    dto.userLabel=event;
    dto.comment=work.comment;
    this.workService.updateWork(dto).subscribe();
  }

  detailsWork(work:WorkGetDto){
    const modalRef = this.modalService.open(DetailsWorkModalComponent);
    modalRef.componentInstance.title = 'Detalles de la negociación';
    modalRef.componentInstance.work=work;
  }

  terminateWork(work){
    const modalRef = this.modalService.open(NoAgreementModalComponent);
    modalRef.componentInstance.title = 'Terminar Negociación';
    modalRef.componentInstance.result.subscribe((reason:string)=>{
      this.loading=true;
      let dto:WorkUpdateDto = new WorkUpdateDto();
      dto.id=work.id;
      dto.providerLabel=work.providerLabel;
      dto.state="CANCELLED_BY_USER";
      dto.userLabel=work.userLabel;
      dto.comment=reason;
      this.workService.updateWork(dto).subscribe(res=>{
        this.workService.getWork("user",localStorage.getItem("id_user"),this.worksList).subscribe((works:WorkGetDto[])=>{
          this.pendingWorks=works;
          this.loading=false;
          this.now= new Date();
          this.notificationMessage="¡La negociación ha sido cancelada!";
          this.notificationType="info";
          this.hideNotification=false;
        });
      });
    });
  }

  makePayment(work){
    this.loading=true;
    this.contractService.getContract(work.contractId).subscribe((contract:ContractGetDto)=>{
      this.paymentService.makePayment(work.id,contract.totalValue,contract.name);
    });
  }

  isEmptyWorks(){
    let empty:boolean=false;
    if(this.pendingWorks==null || this.pendingWorks==undefined){
      empty=true;
    }else{
      if(this.pendingWorks.length < 1){
        empty=true;
      }
    }
    return empty;
  }

  cancelContract(idContract:string){
    this.contractService.deleteContract(idContract).subscribe(()=>{
      this.notificationMessage="¡El contrato ha sido cancelado!";
      this.notificationType="info";
      this.hideNotification=false;
      setTimeout(()=>{ this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
      this.router.navigate(["/dashboard_usuario/negociaciones/en_proceso"])); }, 2000)
    });

  }

}
