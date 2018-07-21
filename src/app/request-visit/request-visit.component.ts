import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { Time } from '../_models/time';
import { VisitScheduleDto } from '../_dtos/visitScheduleDto';
import { DatePipe } from '@angular/common';
import { VisitService } from '../_services/visit.service';
import {Router, ActivatedRoute, Params, RoutesRecognized, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import {Location} from '@angular/common';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-request-visit',
  templateUrl: './request-visit.component.html',
  styleUrls: ['./request-visit.component.css']
})

export class RequestVisitComponent implements OnInit {

  calendarYear:number;
  calendarMonth:number;
  calendarDay:number;
  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  visitScheduleDto:VisitScheduleDto;
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
  userId:string;
  providerId:string;
  workId:string;
  loading:boolean;
  submited:boolean;
  loggedIn:boolean;
  private myDatePickerOptions: IMyDpOptions;
  private altMyDatePickerOptions: IMyDpOptions;

  constructor(private visitService: VisitService, private router: Router, 
    private activatedRoute: ActivatedRoute, private location:Location,
    private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
    this.loading=true;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId=params['user'];
      this.providerId=params['provider'];
      this.workId=params['work'];
      this.loading=false;
    });
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
    this.totalPage=5;
    this.actualPage=1;
    this.calculateAdvancePercentage();
    this.visitScheduleDto= new VisitScheduleDto();
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

  submit(){
    this.loading=true;
    let date:Date=this.mDate.jsdate;
    this.visitScheduleDto.lowerLimit=this.mStartTime.getHour();
    this.visitScheduleDto.upperLimit=this.mEndTime.getHour();
    date.setHours(this.mEndTime.getNumberHour());
    date.setMinutes(this.mEndTime.getNumberMinute());
    this.visitScheduleDto.date=date.getTime();
    let alternativeDate:Date=this.mAlternativeDate.jsdate;
    this.visitScheduleDto.alternativeLowerLimit=this.mAlternativeStartTime.getHour();
    this.visitScheduleDto.alternativeUpperLimit=this.mAlternativeEndTime.getHour();
    alternativeDate.setHours(this.mAlternativeEndTime.getNumberHour());
    alternativeDate.setMinutes(this.mAlternativeEndTime.getNumberMinute());
    this.visitScheduleDto.alternativeDate=alternativeDate.getTime();
    if(this.workId != undefined){
      this.visitService.createVisit(this.visitScheduleDto,null,null,this.workId).subscribe(resp=>{
        this.submited=true;
        this.loading=false;
      });
    }else{
      this.visitService.createVisit(this.visitScheduleDto,this.userId,this.providerId,null).subscribe(resp=>{
        this.submited=true;
        this.loading=false;
      });
    }
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

  selectLimit(limit:Time){
    this.mSelectedStartLimit=limit.getNumberHour()*60+limit.getNumberMinute();
    this.mEndTime=null;
  }

  selectAlternativeLimit(limit:Time){
    this.mAlternativeSelectedStartLimit=limit.getNumberHour()*60+limit.getNumberMinute();
    this.mAlternativeEndTime=null;
  }

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  next(){
    this.actualPage=(this.actualPage+1);
    this.calculateAdvancePercentage();
  }

  back(){
    if(this.actualPage==1){
      this.location.back();
    }
    else{
    this.actualPage=(this.actualPage-1);
    this.calculateAdvancePercentage();
    }
  }

}
