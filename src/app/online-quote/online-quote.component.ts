import { Component, OnInit } from '@angular/core';
import { DynamicFormService } from '../_services/dynamic-form.service';
import { RadioQuestion }  from '../_shared/answer-radio';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-online-quote',
  templateUrl: './online-quote.component.html',
  styleUrls: ['./online-quote.component.css'],
  providers:  [DynamicFormService]
})
export class OnlineQuoteComponent implements OnInit {

  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  currentQuestion:string;
  selectedOption:string;
  imageSource:string;
  //public answers: any[];

  //Signo $ porque es un observable
  public answers$: Observable<any[]>;
  
  constructor(private service: DynamicFormService) {
    
   }

  ngOnInit() {
    this.answers$=this.service.getAnswers("CAR00PR");
    //this.answers=this.service.getAnswers("CAR00PR");
    this.totalPage=4;
    this.actualPage=1;
    this.calculateAdvancePercentage();
    this.currentQuestion="¿Pregunta de prueba?";
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
