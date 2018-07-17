import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { AnswerBase }              from '../_shared/answer-base';
import { AnswerControlService }    from '../_services/answer-control.service';
import { DynamicFormService } from '../_services/dynamic-form.service';
import { Question } from '../_models/question';
import { Observable } from "rxjs/Rx"
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuoteDto } from "../_dtos/quoteDto";
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Location} from '@angular/common';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ AnswerControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() answers$: Observable<AnswerBase<any>[]>;
  form: FormGroup;
  payLoad = '';
  questionsList : Map<string, Question>;
  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  currentQuestion:Question;
  previousQuestion:Question;
  backwardQuestions:Array<string>;
  loading:boolean;
  fileName:string;
  photo:File;
  image:any;
  nextDisable:boolean;
  userId:string;
  providerId:string;
  submitted:boolean;


  constructor(private qcs: AnswerControlService, private dynamicFormervice: DynamicFormService,
    private activatedRoute: ActivatedRoute, private location:Location) {  }

  ngOnInit() {
    this.loading=true;
    this.submitted=false;
    this.fileName="Seleccionar un archivo";
    this.nextDisable=true;
    this.backwardQuestions= new Array();
    this.currentQuestion=new Question('','',0);
    this.form= new FormGroup({});
    this.questionsList= new Map<string, Question>();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId=params['user'];
      this.providerId=params['provider'];
        this.dynamicFormervice.getTotalPages("CAR00PR").subscribe(total => {
          this.totalPage=total;
          this.actualPage=1;
          this.calculateAdvancePercentage();
            this.dynamicFormervice.getQuestions("CAR00PR").subscribe(items =>{
              items.map(item =>{
                this.questionsList.set(item.id,item);
              });
            this.dynamicFormervice.getInitialQuestionId("CAR00PR").subscribe(id =>{
              this.currentQuestion=this.questionsList.get(id);
              this.previousQuestion=this.currentQuestion;
              this.loading=false;
            });
          });
        });
    });
    this.answers$.subscribe(a=>{
      this.form = this.qcs.toFormGroup(a);
    });
  }

  onSubmit() {
    this.loading=true;
    this.payLoad=JSON.stringify(this.form.value);
    let quote:QuoteDto = new QuoteDto();
    quote.requirements= this.payLoad;
    this.dynamicFormervice.createQuote(quote,this.userId,this.providerId,null).subscribe((resp:HttpResponse<String>)=>{
      this.dynamicFormervice.uploadQuotationImage(this.photo,resp.body.substring(resp.body.indexOf(':')+1,resp.body.lastIndexOf('"'))).
      subscribe(resp => {
        this.submitted=true;
        this.loading=false;
      });
    });
  }

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  next(validatios:string, childId:string){
    if(validatios!=null){
      let controlRestrictions:string[]=validatios.split(',');
      let validCount=0;
      for (let cr of controlRestrictions) {
        if(this.form.get(cr).status=='VALID'){
          validCount++;
        }
     }
     if(validCount==controlRestrictions.length){
       this.nextDisable=false;
       this.backwardQuestions.push(this.currentQuestion.id);
       this.currentQuestion=this.questionsList.get(childId);
       this.actualPage=(this.actualPage+1);
       this.calculateAdvancePercentage();
     }
    }else{
      this.backwardQuestions.push(this.currentQuestion.id);
      this.currentQuestion=this.questionsList.get(childId);
      this.actualPage=(this.actualPage+1);
      this.calculateAdvancePercentage();
    }
  }

  back(){
    if(this.actualPage==1){
      this.location.back();
    }
    else{
      let questionId:string = this.backwardQuestions.pop();
      this.currentQuestion=this.questionsList.get(questionId);
      this.actualPage=(this.actualPage-1);
      this.calculateAdvancePercentage();
    }
  }

  onFileChange(event) {
    this.loading=true;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.photo = event.target.files[0];
      this.fileName=this.photo.name;
      reader.readAsDataURL(this.photo);
      reader.onload = (event: any) => {
        this.image=event.target.result;
        this.loading=false;
      }
    }
  }

}

