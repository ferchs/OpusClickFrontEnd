import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {IMyDpOptions} from 'mydatepicker';
import { Time } from '../_models/time';
import { PostponeDto } from "../_dtos/postponeDto";

@Component({
  selector: 'app-postpone-modal',
  templateUrl: './postpone-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./postpone-modal.component.css']
})
export class PostponeModalComponent implements OnInit {

  calendarYear:number;
  calendarMonth:number;
  calendarDay:number;
  schedules:Array<Time>;
  alternativeSchedules:Array<Time>;
  mStartTime:Time;
  mEndTime:Time;
  mAlternativeStartTime:Time;
  mAlternativeEndTime:Time;
  mDate:any;
  mAlternativeDate:any;
  mSelectedStartLimit:number;
  mAlternativeSelectedStartLimit:number;
  loading:boolean;
  submited:boolean;
  private myDatePickerOptions: IMyDpOptions;
  private altMyDatePickerOptions: IMyDpOptions;

  @Input() title;
  @Input() content;
  @Output() result = new EventEmitter<PostponeDto>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    let now:Date= new Date();
    this.calendarYear=now.getFullYear();
    this.calendarMonth=now.getMonth() + 1;
    this.calendarDay=now.getDate() + 1;
    this.myDatePickerOptions= {
      dayLabels: {su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa"},
      monthLabels: {1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"},
      disableUntil:{year: this.calendarYear, month: this.calendarMonth, day: this.calendarDay},
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
    this.altMyDatePickerOptions=this.myDatePickerOptions;
    this.mStartTime=null;
    this.mEndTime=null;
    this.mAlternativeStartTime=null;
    this.mAlternativeEndTime=null;
    this.mSelectedStartLimit=10000;
    this.mAlternativeSelectedStartLimit=10000;
    this.schedules=new Time("","").getDefaultTimeList();
    this.alternativeSchedules=new Time("","").getDefaultTimeList();
    this.submited=false;
  }

  selectLimit(limit:Time){
    this.mSelectedStartLimit=limit.getNumberHour()*60+limit.getNumberMinute();
    this.mEndTime=null;
  }

  selectAlternativeLimit(limit:Time){
    this.mAlternativeSelectedStartLimit=limit.getNumberHour()*60+limit.getNumberMinute();
    this.mAlternativeEndTime=null;
  }

  updateAlternativeDate(){
    let date:Date=this.mDate.jsdate;
    this.altMyDatePickerOptions= {
      dayLabels: {su: "Do", mo: "Lu", tu: "Ma", we: "Mi", th: "Ju", fr: "Vi", sa: "Sa"},
      monthLabels: {1: "Ene", 2: "Feb", 3: "Mar", 4: "Abr", 5: "May", 6: "Jun", 7: "Jul", 8: "Ago", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dic"},
      disableUntil:{year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()+1},
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
  }

  confirm(){
    let dto:PostponeDto= new PostponeDto();
    let date:Date=this.mDate.jsdate;
    dto.lowerLimit=this.mStartTime.getHour();
    dto.upperLimit=this.mEndTime.getHour();
    date.setHours(this.mEndTime.getNumberHour());
    date.setMinutes(this.mEndTime.getNumberMinute());
    dto.date=date.getTime();
    let alternativeDate:Date=this.mAlternativeDate.jsdate;
    dto.alternativeLowerLimit=this.mAlternativeStartTime.getHour();
    dto.alternativeUpperLimit=this.mAlternativeEndTime.getHour();
    alternativeDate.setHours(this.mAlternativeEndTime.getNumberHour());
    alternativeDate.setMinutes(this.mAlternativeEndTime.getNumberMinute());
    dto.alternativeDate=alternativeDate.getTime();
    this.result.emit(dto);
  }
}
