import { Component, OnInit } from '@angular/core';
import { VisitGetDto} from "../../_dtos/visitGetDto";
import { VisitService } from "../../_services/visit.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnfulfilledModalComponent } from "../../unfulfilled-modal/unfulfilled-modal.component";
import { visitUpdateDto} from "../../_dtos/visitUpdateDto";

@Component({
  selector: 'app-user-dashboard-visit-unfulfilled',
  templateUrl: './user-dashboard-visit-unfulfilled.component.html',
  styleUrls: ['./user-dashboard-visit-unfulfilled.component.css']
})
export class UserDashboardVisitUnfulfilledComponent implements OnInit {

  constructor(private visitService:VisitService, private modalService: NgbModal) { }

  unfulfilledVisits:VisitGetDto[];
  now:Date;
  loading:boolean;
  hideNotification:boolean;
  notificationMessage:string;
  notificationType:string;

  ngOnInit() {
    this.hideNotification=true;
    this.unfulfilledVisits=null;
    this.visitService.getVisit("user",localStorage.getItem("id_user"),null,"ACCEPTED_BY_USER,ACCEPTED_BY_PROVIDER,POSTPONE_BY_USER,PENDING_BY_PROVIDER_ACCEPT,PENDING_BY_USER_ACCEPT,POSTPONE_BY_PROVIDER,UNFULFILLED_VISIT_BY_USER")
    .subscribe((visits:VisitGetDto[])=>{
      this.unfulfilledVisits=visits;
      this.now= new Date();
      this.loading=false;
    });
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
            this.unfulfilledVisits=visits;
            this.loading=false;
            this.hideNotification=false;
            this.notificationMessage="¡Se ha reportado un incumplimiento!"
            this.notificationType="success";
          });
        });
      });
  }

}
