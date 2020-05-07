import { Component, OnInit } from '@angular/core';
import { VisitGetDto} from "../../_dtos/visitGetDto";
import { VisitService } from "../../_services/visit.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-provider-dashboard-visit-unfulfilled',
  templateUrl: './provider-dashboard-visit-unfulfilled.component.html',
  styleUrls: ['./provider-dashboard-visit-unfulfilled.component.css']
})
export class ProviderDashboardVisitUnfulfilledComponent implements OnInit {

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
    this.visitService.getVisit("provider",localStorage.getItem("id_provider"),null,"UNFULFILLED_VISIT_BY_USER,UNFULFILLED_VISIT_BY_PROVIDER")
    .subscribe((visits:VisitGetDto[])=>{
      this.unfulfilledVisits=visits;
      this.now= new Date();
      this.loading=false;
    });
  }

  

}
