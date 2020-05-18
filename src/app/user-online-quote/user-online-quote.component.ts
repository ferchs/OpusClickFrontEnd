import { Component, OnInit } from '@angular/core';
import { DynamicFormService } from '../_services/dynamic-form.service';
import { Observable } from "rxjs/Rx";
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-online-quote',
  templateUrl: './user-online-quote.component.html',
  styleUrls: ['./user-online-quote.component.css'],
  providers:  [DynamicFormService, AuthService]
})
export class UserOnlineQuoteComponent implements OnInit {
  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  currentQuestion:string;
  selectedOption:string;
  imageSource:string;
  loggedIn:boolean;
  formId:string;
  //public answers: any[];

  //Signo $ porque es un observable
  public answers$: Observable<any[]>;
  
  constructor(private service: DynamicFormService, private authService: AuthService,
    private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.formId=params['form'];
      this.answers$=this.service.getAnswers(this.formId);
    });
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
