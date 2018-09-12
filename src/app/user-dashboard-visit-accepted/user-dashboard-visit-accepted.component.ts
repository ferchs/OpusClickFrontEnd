import { Component, OnInit } from '@angular/core';
import { VisitService } from "../_services/visit.service";
import { VisitGetDto} from "../_dtos/visitGetDto";
import { visitUpdateDto} from "../_dtos/visitUpdateDto";
import { visitUpdateStateDto} from "../_dtos/visitUpdateStateDto";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { PostponeModalComponent } from '../postpone-modal/postpone-modal.component';
import { DetailsVisitModalComponent } from '../details-visit-modal/details-visit-modal.component';
import { UnfulfilledModalComponent } from "../unfulfilled-modal/unfulfilled-modal.component";

@Component({
  selector: 'app-user-dashboard-visit-accepted',
  templateUrl: './user-dashboard-visit-accepted.component.html',
  styleUrls: ['./user-dashboard-visit-accepted.component.css']
})
export class UserDashboardVisitAcceptedComponent implements OnInit {

  acceptedVisits:VisitGetDto[];
  now:Date;
  loading:boolean;
  hideNotification:boolean;
  notificationMessage:string;
  notificationType:string;

  constructor(private visitService:VisitService, private modalService: NgbModal) { 
  }
  //ACCEPTED
  ngOnInit() {
    this.hideNotification=true;
    this.loading=true;
    this.visitService.getVisit("user",localStorage.getItem("id_user"),null,"ACCEPTED_BY_USER,ACCEPTED_BY_PROVIDER,POSTPONE_BY_USER").subscribe((visits:VisitGetDto[])=>{
      this.acceptedVisits=visits;
      this.now= new Date();
      this.loading=false;
    });
  }
  
  postponeVisit(visit:VisitGetDto){
    const modalRef = this.modalService.open(PostponeModalComponent,{ centered: true });
    modalRef.componentInstance.title = 'Posponer Visita';
    modalRef.componentInstance.result.subscribe(postponeDto=>{
        this.loading=true;
        let dto:visitUpdateDto = new visitUpdateDto();
        dto.id=visit.id;
        dto.state="POSTPONE_BY_USER";
        dto.date=postponeDto.date;
        dto.alternativeDate=postponeDto.alternativeDate;
        dto.address=visit.address;
        dto.neighborhood=visit.neighborhood;
        dto.description=visit.description;	
        dto.lowerLimit=visit.lowerLimit;
        dto.alternativeLowerLimit=visit.alternativeLowerLimit;
        dto.upperLimit=visit.upperLimit;
        dto.alternativeUpperLimit=visit.alternativeUpperLimit;
        this.visitService.updateVisit(dto).subscribe(res=>{
          this.visitService.getVisit("user",localStorage.getItem("id_user"),null,"ACCEPTED_BY_USER,ACCEPTED_BY_PROVIDER,POSTPONE_BY_USER").subscribe((visits:VisitGetDto[])=>{
            this.acceptedVisits=visits;
            this.loading=false;
            this.notificationMessage="La visita ha sido pospuesta. Debes esperar a que el experto responda";
            this.notificationType="info";
            this.hideNotification=false;
          });
        });
      });
  }

  cancelVisit(visit:VisitGetDto) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = '¿Estas seguro de cancelar esta visita?';
    modalRef.componentInstance.content = 'Si cancelas la visita el experto no te visitará';
    modalRef.componentInstance.result.subscribe(response=>{
      if(response==true){
        this.loading=true;
        let dto:visitUpdateStateDto = new visitUpdateStateDto();
        dto.id=visit.id;
        dto.state="REJECTED_BY_USER";
        this.visitService.updateVisitState(dto).subscribe(res=>{
          this.visitService.getVisit("user",localStorage.getItem("id_user"),null,"ACCEPTED_BY_USER,ACCEPTED_BY_PROVIDER,POSTPONE_BY_USER")
          .subscribe((visits:VisitGetDto[])=>{
            this.acceptedVisits=visits;
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
    if(this.acceptedVisits==null || this.acceptedVisits==undefined){
      empty=true;
    }else{
      if(this.acceptedVisits.length < 1){
        empty=true;
      }
    }
    return empty;
  }

  reportBreach(visit:VisitGetDto){
    const modalRef = this.modalService.open(UnfulfilledModalComponent);
    modalRef.componentInstance.title = 'Reportar Incumplimiento';
    modalRef.componentInstance.result.subscribe((response:string)=>{
      this.loading=true;
      let dto:visitUpdateDto = new visitUpdateDto();
        dto.id=visit.id;
        dto.state="UNFULFILLED_VISIT_BY_PROVIDER";
        let numberDate=+visit.date.toString();
        dto.date=numberDate;
        let alternativeNumberDate=+visit.alternativeDate.toString();
        dto.alternativeDate=alternativeNumberDate;
        dto.address=visit.address;
        dto.neighborhood=visit.neighborhood;
        dto.description=visit.description;
        dto.breachDescription=response;	
        dto.lowerLimit=visit.lowerLimit;
        dto.alternativeLowerLimit=visit.alternativeLowerLimit;
        dto.upperLimit=visit.upperLimit;
        dto.alternativeUpperLimit=visit.alternativeUpperLimit;
        this.visitService.updateVisit(dto).subscribe(res=>{
          this.visitService.getVisit("user",localStorage.getItem("id_user"),null,"ACCEPTED_BY_USER,ACCEPTED_BY_PROVIDER,POSTPONE_BY_USER,PENDING_BY_PROVIDER_ACCEPT,PENDING_BY_USER_ACCEPT,POSTPONE_BY_PROVIDER,UNFULFILLED_VISIT_BY_USER").subscribe((visits:VisitGetDto[])=>{
            this.acceptedVisits=visits;
            this.loading=false;
            this.hideNotification=false;
            this.notificationMessage="¡Se ha reportado un incumplimiento!"
            this.notificationType="success";
          });
        });
      });
  }

}
