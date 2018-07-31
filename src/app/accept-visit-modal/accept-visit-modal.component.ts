import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { VisitGetDto} from "../_dtos/visitGetDto";
import { AcceptDto} from "../_dtos/acceptDto";
import * as moment from "moment";

@Component({
  selector: 'app-accept-visit-modal',
  templateUrl: './accept-visit-modal.component.html',
  styleUrls: ['./accept-visit-modal.component.css']
})

export class AcceptVisitModalComponent implements OnInit {

  @Input() title;
  @Input() message;
  @Input() visit:VisitGetDto;
  @Output() result = new EventEmitter<VisitGetDto>();

  alternatives:Array<AcceptDto>;
  alternative:AcceptDto;
  now:Date;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.now= new Date();
    this.alternative= null;
    this.alternatives= new Array<AcceptDto>();
    let alternative1:AcceptDto= new AcceptDto();
    alternative1.date=this.visit.date;
    alternative1.description="El "+moment(this.visit.date).date()+"/"+
    this.getSpanishMonthName(moment(this.visit.date).month())+"/"+moment(this.visit.date).year()+
    " Entre "+this.getCompactHour(this.visit.lowerLimit)+" - "+this.getCompactHour(this.visit.upperLimit);
    alternative1.isAlternative=false;
    this.alternatives.push(alternative1);
    let alternative2:AcceptDto= new AcceptDto();
    alternative2.date=this.visit.alternativeDate;
    alternative2.description="El "+moment(this.visit.alternativeDate).date()+"/"+
    this.getSpanishMonthName(moment(this.visit.alternativeDate).month())+"/"+moment(this.visit.alternativeDate).year()+
    " Entre "+this.getCompactHour(this.visit.alternativeLowerLimit)+" - "+this.getCompactHour(this.visit.alternativeUpperLimit);
    alternative2.isAlternative=true;
    this.alternatives.push(alternative2);
  }

  confirm(){
    if(this.alternative.isAlternative){
      this.visit.date=this.visit.alternativeDate;
      this.visit.lowerLimit=this.visit.alternativeLowerLimit;
      this.visit.upperLimit=this.visit.alternativeUpperLimit;
    }else{
      this.visit.alternativeDate=this.visit.date;
      this.visit.alternativeLowerLimit=this.visit.lowerLimit;
      this.visit.alternativeUpperLimit=this.visit.upperLimit;
    }
    this.result.emit(this.visit);
  }

  private getSpanishMonthName(intMonth:number){
    if(intMonth==0){
      return 'Enero';
    }
    if(intMonth==1){
      return 'Febrero';
    }
    if(intMonth==2){
      return 'Marzo';
    }
    if(intMonth==3){
      return 'Abril';
    }
    if(intMonth==4){
      return 'Mayo';
    }
    if(intMonth==5){
      return 'Junio';
    }
    if(intMonth==6){
      return 'Julio';
    }
    if(intMonth==7){
      return 'Agosto';
    }
    if(intMonth==8){
      return 'Septiembre';
    }
    if(intMonth==9){
      return 'Octubre';
    }
    if(intMonth==10){
      return 'Noviembre';
    }
    if(intMonth==11){
      return 'Diciembre';
    }
  }

  private getCompactHour(hour:string){
    return hour.substring(0,hour.lastIndexOf(':'));
  }
}
