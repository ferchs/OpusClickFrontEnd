import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { AnswerBase }              from '../_shared/answer-base';
import { AnswerControlService }    from '../_services/answer-control.service';
import { DynamicFormService } from '../_services/dynamic-form.service';
import { Question } from '../_models/question';
import { Observable } from "rxjs/Rx"

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
  nextQuestion:Question;

  constructor(private qcs: AnswerControlService, private service: DynamicFormService) {  }

  ngOnInit() {
    this.currentQuestion=new Question('','',0);
    this.previousQuestion=new Question('','',0);
    this.nextQuestion=new Question('','',0);
    this.form= new FormGroup({});
    this.questionsList= new Map<string, Question>();
    this.service.getTotalPages("CAR00PR").subscribe(total => {
      this.totalPage=total;
      this.actualPage=1;
      this.calculateAdvancePercentage();
      });
    this.service.getQuestions("CAR00PR").subscribe(items =>{
      items.map(item =>{
        this.questionsList.set(item.id,item);
      });
      this.service.getInitialQuestionId("CAR00PR").subscribe(id =>{
        this.currentQuestion=this.questionsList.get(id);
        this.previousQuestion=this.currentQuestion;
        this.nextQuestion=this.currentQuestion;
      });
    });
    this.answers$.subscribe(a=>{
      this.form = this.qcs.toFormGroup(a);
    });
  }

  onSubmit() {
    this.payLoad=JSON.stringify(this.form.value);
  }

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  radioButtonClick(id:string){
    this.currentQuestion=this.questionsList.get(id);
    this.next();
  }
  
  next(){
    this.actualPage=(this.actualPage+1);
    this.calculateAdvancePercentage();
  }

  back(){
    this.actualPage=(this.actualPage-1);
    this.calculateAdvancePercentage();
    this.currentQuestion=this.previousQuestion;
  }
}

