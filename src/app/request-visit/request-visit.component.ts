import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-request-visit',
  templateUrl: './request-visit.component.html',
  styleUrls: ['./request-visit.component.css']
})

export class RequestVisitComponent implements OnInit {

  private myDatePickerOptions: IMyDpOptions = {
    dayLabels: {su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa"},
    monthLabels: {1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"},
    dateFormat: "dd/mm/yyyy",
    todayBtnTxt: "Hoy",
    firstDayOfWeek: "mo",
    sunHighlight: true,
    markCurrentDay:true,
    selectorHeight:'232px',
    selectorWidth:'252px',
    height:'36px',
    width:'100%',
    selectionTxtFontSize: '1rem'
  };

  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  mVisitDate:any;
  mSchedule:string;
  mAddress:string;
  mNeighborhood:string;
  mWorkDescription:string;

  constructor() { }

  ngOnInit() {
    this.totalPage=4;
    this.actualPage=1;
    this.calculateAdvancePercentage();
    this.mVisitDate=null;
    this.mSchedule="";
    this.mAddress="";
    this.mNeighborhood="";
    this.mWorkDescription="";
  }

  onSubmit(){

  }

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  next(){
    this.actualPage=(this.actualPage+1);
    this.calculateAdvancePercentage();
  }

  back(){
    this.actualPage=(this.actualPage-1);
    this.calculateAdvancePercentage();
  }

}
