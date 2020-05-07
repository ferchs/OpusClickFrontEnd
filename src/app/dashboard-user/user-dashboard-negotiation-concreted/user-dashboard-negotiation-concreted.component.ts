import { Component, OnInit } from '@angular/core';
import { WorkGetDto} from "../../_dtos/workGetDto";
import { WorkService } from "../../_services/work.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkUpdateDto } from "../../_dtos/workUpdateDto";
import { DetailsWorkModalComponent } from '../../details-work-modal/details-work-modal.component';
import { NoAgreementModalComponent } from '../../no-agreement-modal/no-agreement-modal.component';

@Component({
  selector: 'app-user-dashboard-negotiation-concreted',
  templateUrl: './user-dashboard-negotiation-concreted.component.html',
  styleUrls: ['./user-dashboard-negotiation-concreted.component.css']
})
export class UserDashboardNegotiationConcretedComponent implements OnInit {
  
  worksList:string="IN_PROGRESS,PARTIALLY_FINISHED,FINALIZED,PAID_OUT,DENIED,UNFULFILLED";
  pendingWorks:WorkGetDto[];
  loading:boolean;
  hideNotification:boolean;
  notificationMessage:string;
  notificationType:string;
  now:Date;

  constructor(private workService:WorkService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loading=null;
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
    let dto:WorkUpdateDto = new WorkUpdateDto();
    dto.id=work.id;
    dto.providerLabel=work.providerLabel;
    dto.userLabel=work.userLabel;
    dto.comment=work.comment;
    dto.state="IN_PROGRESS";
    this.workService.updateWork(dto).subscribe();
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

}
