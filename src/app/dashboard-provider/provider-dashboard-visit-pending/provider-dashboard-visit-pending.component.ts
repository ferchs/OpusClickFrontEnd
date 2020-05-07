import { Component, OnInit } from '@angular/core';
import { VisitService } from "../../_services/visit.service";
import { VisitGetDto} from "../../_dtos/visitGetDto";
import { visitUpdateDto} from "../../_dtos/visitUpdateDto";
import { visitUpdateStateDto} from "../../_dtos/visitUpdateStateDto";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { AcceptVisitModalComponent } from '../../accept-visit-modal/accept-visit-modal.component';
import { PostponeModalComponent } from '../../postpone-modal/postpone-modal.component';
import { DetailsVisitModalComponent } from '../../details-visit-modal/details-visit-modal.component';

@Component({
  selector: 'app-provider-dashboard-visit-pending',
  templateUrl: './provider-dashboard-visit-pending.component.html',
  styleUrls: ['./provider-dashboard-visit-pending.component.css']
})
export class ProviderDashboardVisitPendingComponent implements OnInit {

  pendingVisits:VisitGetDto[];
  loading:boolean;
  hideNotification:boolean;
  notificationMessage:string;
  notificationType:string
  now:Date;

  constructor(private visitService:VisitService, private modalService: NgbModal) { 
  }

  ngOnInit() {
    this.hideNotification=true;
    this.loading=true;
    this.visitService.getVisit("provider",localStorage.getItem("id_provider"),null,"PENDING_BY_PROVIDER_ACCEPT,PENDING_BY_USER_ACCEPT,POSTPONE_BY_USER").subscribe((visits:VisitGetDto[])=>{
      this.pendingVisits=visits;
      this.now= new Date();
      if(this.pendingVisits!=null){
        if(this.pendingVisits.length==0){
          this.pendingVisits=null;
        }
      }
      this.loading=false;
    });
  }

  acceptVisit(visit:VisitGetDto) {
    const modalRef = this.modalService.open(AcceptVisitModalComponent);
    modalRef.componentInstance.title = 'Elige Fecha De Visita';
    modalRef.componentInstance.message = 'Tu cliente te ha propuesto dos fechas de visita posibles,'
    +' elige la que más se ajuste a tu tiempo.';
    modalRef.componentInstance.visit = visit;
    modalRef.componentInstance.result.subscribe((visitDto:VisitGetDto)=>{
      this.loading=true;
      let dto:visitUpdateDto = new visitUpdateDto();
        dto.id=visitDto.id;
        dto.state="ACCEPTED_BY_PROVIDER";
        let numberDate:number=+visitDto.date.toString();
        dto.date=numberDate;
        let alternativeNumberDate:number=+visitDto.date.toString();
        dto.alternativeDate=alternativeNumberDate;
        dto.address=visitDto.address;
        dto.neighborhood=visitDto.neighborhood;
        dto.description=visitDto.description;	
        dto.lowerLimit=visitDto.lowerLimit;
        dto.alternativeLowerLimit=visitDto.alternativeLowerLimit;
        dto.upperLimit=visitDto.upperLimit;
        dto.alternativeUpperLimit=visitDto.alternativeUpperLimit;
      this.visitService.updateVisit(dto).subscribe(res=>{
        this.visitService.getVisit("provider",localStorage.getItem("id_provider"),null,"PENDING_BY_PROVIDER_ACCEPT,PENDING_BY_USER_ACCEPT,POSTPONE_BY_USER").subscribe((visits:VisitGetDto[])=>{
          this.pendingVisits=visits;
          this.loading=false;
          this.notificationMessage="Se ha aceptado la visita. Puedes mirarla en visitas aceptadas";
          this.notificationType="success";
          this.hideNotification=false;
        });
      });
    });
  }
  
  deferVisit(visit:VisitGetDto){
    const modalRef = this.modalService.open(PostponeModalComponent,{ centered: true });
    modalRef.componentInstance.title = 'Posponer Visita';
    modalRef.componentInstance.result.subscribe(postponeDto=>{
      this.loading=true;
      let dto:visitUpdateDto = new visitUpdateDto();
      dto.id=visit.id;
      dto.state="PENDING_BY_USER_ACCEPT";
      dto.date=postponeDto.date;
      dto.alternativeDate=postponeDto.alternativeDate;
      dto.address=visit.address;
      dto.neighborhood=visit.neighborhood;
      dto.description=visit.description;	
      dto.lowerLimit=postponeDto.lowerLimit;
      dto.alternativeLowerLimit=postponeDto.alternativeLowerLimit;
      dto.upperLimit=postponeDto.upperLimit;
      dto.alternativeUpperLimit=postponeDto.alternativeUpperLimit;
        this.visitService.updateVisit(dto).subscribe(res=>{
          this.visitService.getVisit("provider",localStorage.getItem("id_provider"),null,"PENDING_BY_PROVIDER_ACCEPT,PENDING_BY_USER_ACCEPT,POSTPONE_BY_USER").subscribe((visits:VisitGetDto[])=>{
              this.pendingVisits=visits;
              this.notificationMessage="¡Propuesta enviada correctamente!";
              this.notificationType="info";
              this.loading=false;
              this.hideNotification=false;
          });
        });
      });
  }

  cancelVisit(visit:VisitGetDto) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = '¿Estas seguro de cancelar esta visita?';
    modalRef.componentInstance.content = 'Si cancelas la visita tu reputación en la plataforma bajará';
    modalRef.componentInstance.result.subscribe(response=>{
      if(response==true){
        this.loading=true;
        let dto:visitUpdateStateDto = new visitUpdateStateDto();
        dto.id=visit.id;
        dto.state="REJECTED_BY_PROVIDER";
        this.visitService.updateVisitState(dto).subscribe(res=>{
          this.visitService.getVisit("provider",localStorage.getItem("id_provider"),null,"PENDING_BY_PROVIDER_ACCEPT,PENDING_BY_USER_ACCEPT,POSTPONE_BY_USER")
          .subscribe((visits:VisitGetDto[])=>{
            this.pendingVisits=visits;
            this.loading=false;
            this.notificationMessage="¡La visita ha sido cancelada!";
            this.notificationType="info";
            this.hideNotification=false;
          });
        });
      }
    });
  }

  detailsVisit(visit:VisitGetDto){
    const modalRef = this.modalService.open(DetailsVisitModalComponent);
    modalRef.componentInstance.title = 'Detalles de visita';
    modalRef.componentInstance.visit = visit;
  }

  isEmptyWorks(){
    let empty:boolean=false;
    if(this.pendingVisits==null || this.pendingVisits==undefined){
      empty=true;
    }else{
      if(this.pendingVisits.length < 1){
        empty=true;
      }
    }
    return empty;
  }

}
