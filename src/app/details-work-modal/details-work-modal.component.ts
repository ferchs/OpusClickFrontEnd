import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { WorkGetDto} from "../_dtos/workGetDto";

@Component({
  selector: 'app-details-work-modal',
  templateUrl: './details-work-modal.component.html',
  styleUrls: ['./details-work-modal.component.css']
})
export class DetailsWorkModalComponent implements OnInit {

  @Input() title;
  @Input() work:WorkGetDto;
  workDto:WorkGetDto;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.workDto=new WorkGetDto();
    this.workDto.workNumber=this.work.workNumber;
    this.workDto.creationDate=this.work.creationDate;
    this.workDto.state=this.work.state;
    if(this.workDto.state==="PENDING_BY_VISIT"){
      this.workDto.state="Pendiente por visita";
    }
    else if(this.workDto.state==="PENDING_BY_QUOTATION"){
      this.workDto.state="Pendiente por cotización";
    }
  }
}
