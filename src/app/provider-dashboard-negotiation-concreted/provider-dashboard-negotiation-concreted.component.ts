import { Component, OnInit } from '@angular/core';
import { WorkGetDto} from "../_dtos/workGetDto";
import { WorkService } from "../_services/work.service";
import { DynamicFormService } from '../_services/dynamic-form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkUpdateDto } from "../_dtos/workUpdateDto";
import { DetailsWorkModalComponent } from '../details-work-modal/details-work-modal.component';
import { NoAgreementModalComponent } from '../no-agreement-modal/no-agreement-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { DetailsOnlineQuoteModalComponent } from '../details-online-quote-modal/details-online-quote-modal.component';
import { OnlineQuoteGetDto } from "../_dtos/onlineQuoteGetDto";
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-provider-dashboard-negotiation-concreted',
  templateUrl: './provider-dashboard-negotiation-concreted.component.html',
  styleUrls: ['./provider-dashboard-negotiation-concreted.component.css']
})
export class ProviderDashboardNegotiationConcretedComponent implements OnInit {

  worksList:string="IN_PROGRESS,PARTIALLY_FINISHED,FINALIZED,PAID_OUT,DENIED,UNFULFILLED";
  pendingWorks:WorkGetDto[];
  loading:boolean;
  hideNotification:boolean;
  notificationMessage:string;
  notificationType:string;
  now:Date;

  constructor(private workService:WorkService, private dynamicFormService:DynamicFormService,
     private modalService: NgbModal,private router: Router) { }

  ngOnInit() {
    this.loading=true;
    this.pendingWorks=null;
    this.hideNotification=true;
    this.workService.getWork("provider",localStorage.getItem("id_provider"),this.worksList).subscribe((works:WorkGetDto[])=>{
      this.pendingWorks=works;
      this.loading=false;
      this.now= new Date();
    });
  }

  newLabelChange(event,work) {
    let dto:WorkUpdateDto = new WorkUpdateDto();
    dto.id=work.id;
    dto.providerLabel=event;
    dto.state="LABEL_CHANGE";
    dto.userLabel=work.userLabel;
    dto.comment=work.comment;
    this.workService.updateWork(dto).subscribe();
  }

  detailsWork(work:WorkGetDto){
    const modalRef = this.modalService.open(DetailsWorkModalComponent);
    modalRef.componentInstance.title = 'Detalles de la negociación';
    modalRef.componentInstance.work=work;
  }

  detailsOnlineQuote(workId:number){
    this.dynamicFormService.getQuote(workId).subscribe((quote:OnlineQuoteGetDto)=>{
      const modalRef = this.modalService.open(DetailsOnlineQuoteModalComponent);
      modalRef.componentInstance.title = 'Detalles de la solicitud';
      modalRef.componentInstance.values=quote.requirements;
    });
  }

  requestExtension(work:WorkGetDto){
    console.log(work)
    let wn=work.workNumber;
    let link='https://api.whatsapp.com/send?phone=573222268918&text=Solicito prórroga para el trabajo No.'+wn;
    window.open(link, '_blank');
    /*const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Solicitar Prórroga';
    modalRef.componentInstance.content="Escríbenos al (322)-226-89-18";*/
  }

  terminateWork(work){
    const modalRef = this.modalService.open(NoAgreementModalComponent);
    modalRef.componentInstance.title = 'Terminar Negociación';
    modalRef.componentInstance.result.subscribe((reason:string)=>{
      this.loading=true;
      let dto:WorkUpdateDto = new WorkUpdateDto();
      dto.id=work.id;
      dto.providerLabel=work.providerLabel;
      dto.state="CANCELLED_BY_PROVIDER";
      dto.userLabel=work.userLabel;
      dto.comment=reason;
      this.workService.updateWork(dto).subscribe(res=>{
        this.workService.getWork("provider",localStorage.getItem("id_provider"),this.worksList).subscribe((works:WorkGetDto[])=>{
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

  resolvedDisagreement(work){
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Resolver Inconformidad';
    modalRef.componentInstance.content="¿Estas seguro de que has resuelto el inconveniente?";
    modalRef.componentInstance.result.subscribe(ok=>{
      if(ok){
        this.loading=true;
        let dto:WorkUpdateDto = new WorkUpdateDto();
        dto.id=work.id;
        dto.providerLabel=work.providerLabel;
        dto.state="PARTIALLY_FINISHED";
        dto.userLabel=work.userLabel;
        this.workService.updateWork(dto).subscribe(res=>{
          this.workService.getWork("provider",localStorage.getItem("id_provider"),this.worksList).subscribe((works:WorkGetDto[])=>{
            this.pendingWorks=works;
            this.loading=false;
            this.now= new Date();
            this.notificationMessage="¡Se ha enviado la novedad!";
            this.notificationType="info";
            this.hideNotification=false;
          });
        });
      }
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
}
