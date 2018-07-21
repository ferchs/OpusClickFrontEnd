import { Component, OnInit } from '@angular/core';
import { WorkGetDto} from "../_dtos/workGetDto";
import { WorkService } from "../_services/work.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkUpdateDto } from "../_dtos/workUpdateDto";
import { DetailsWorkModalComponent } from '../details-work-modal/details-work-modal.component';
import { NoAgreementModalComponent } from '../no-agreement-modal/no-agreement-modal.component';

@Component({
  selector: 'app-provider-dashboard-negotiation-pending',
  templateUrl: './provider-dashboard-negotiation-pending.component.html',
  styleUrls: ['./provider-dashboard-negotiation-pending.component.css']
})
export class ProviderDashboardNegotiationPendingComponent implements OnInit {

  pendingWorks:WorkGetDto[];
  loading:boolean;
  hideNotification:boolean;
  notificationMessage:string;
  notificationType:string;
  now:Date;

  constructor(private workService:WorkService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loading=true;
    this.hideNotification=true;
    this.workService.getWork("provider",localStorage.getItem("id_provider"),"PENDING_BY_VISIT,PENDING_BY_QUOTATION,QUOTE_MADE,NEGOTIATED_BY_USER").subscribe((works:WorkGetDto[])=>{
      this.pendingWorks=works;
      this.loading=false;
      this.now= new Date();
    });
  }

  newLabelChange(event,work) {
    let dto:WorkUpdateDto = new WorkUpdateDto();
    dto.id=work.id;
    dto.providerLabel=event;
    dto.state=work.state;
    dto.userLabel=work.userLabel;
    dto.comment=work.comment;
    this.workService.updateWork(dto).subscribe();
  }

  detailsWork(work:WorkGetDto){
    const modalRef = this.modalService.open(DetailsWorkModalComponent);
    modalRef.componentInstance.title = 'Detalles de la negociación';
    modalRef.componentInstance.work=work;
  }

  noAgreement(work){
    const modalRef = this.modalService.open(NoAgreementModalComponent);
    modalRef.componentInstance.title = 'Razón Desacuerdo';
    modalRef.componentInstance.result.subscribe((reason:string)=>{
      this.loading=true;
      let dto:WorkUpdateDto = new WorkUpdateDto();
      dto.id=work.id;
      dto.providerLabel=work.providerLabel;
      dto.state="NO_AGREEMENT_BY_PROVIDER";
      dto.userLabel=work.userLabel;
      dto.comment=reason;
      this.workService.updateWork(dto).subscribe(res=>{
        this.workService.getWork("provider",localStorage.getItem("id_provider"),"PENDING_BY_VISIT,PENDING_BY_QUOTATION,QUOTE_MADE,NEGOTIATED_BY_USER").subscribe((works:WorkGetDto[])=>{
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

}
