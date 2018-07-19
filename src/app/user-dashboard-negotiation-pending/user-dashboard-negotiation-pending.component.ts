import { Component, OnInit } from '@angular/core';
import { WorkGetDto} from "../_dtos/workGetDto";
import { WorkService } from "../_services/work.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkUpdateDto } from "../_dtos/workUpdateDto";

@Component({
  selector: 'app-user-dashboard-negotiation-pending',
  templateUrl: './user-dashboard-negotiation-pending.component.html',
  styleUrls: ['./user-dashboard-negotiation-pending.component.css']
})
export class UserDashboardNegotiationPendingComponent implements OnInit {

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
    this.workService.getWork("user",localStorage.getItem("id_user"),"PENDING_BY_VISIT,PENDING_BY_QUOTATION,QUOTE_MADE,NEGOTIATED_BY_PROVIDER").subscribe((works:WorkGetDto[])=>{
      this.pendingWorks=works;
      this.loading=false;
      this.now= new Date();
    });
  }

  newLabelChange(event,work) {
    let dto:WorkUpdateDto = new WorkUpdateDto();
    dto.id=work.id;
    dto.providerLabel=work.providerLabel;
    dto.state=work.state;
    dto.userLabel=event;
    console.log("Se Envió ->"+ dto.userLabel);
    this.workService.updateWork(dto).subscribe();
  }

}
