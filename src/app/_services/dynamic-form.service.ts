import { Injectable }       from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DropdownQuestion } from '../_shared/answer-dropdown';
import { AnswerBase }     from '../_shared/answer-base';
import { TextboxQuestion }  from '../_shared/answer-textbox';
import { TextboxButtonsQuestion }  from '../_shared/answer-textbox-buttons';
import { RadioQuestion }  from '../_shared/answer-radio';
import { RadioTextboxQuestion }  from '../_shared/answer-radio-textbox';
import { FileQuestion }  from '../_shared/answer-file';
import { TextareaQuestion }  from '../_shared/answer-textarea';
import { Question } from '../_models/question';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { QuoteDto } from "../_dtos/quoteDto";
import { OnlineQuoteGetDto } from "../_dtos/onlineQuoteGetDto";

@Injectable()
export class DynamicFormService {

  private apiUrl = environment.apiUrlBase+"/online_quotes";
  total:number;

  constructor(private firebase:AngularFireDatabase, private http:HttpClient){
  }
  
  getFirebaseMetadata(idForm:string){
    let dataList:AngularFireList<any> = this.firebase.list(idForm);
    return dataList.snapshotChanges().map(actions => {
    return actions.map(action => ({ key: action.key, ...action.payload.val()}));
  });
  }

  getInitialQuestionId(idForm:string){
    let subject = new Subject<string>();
    this.getFirebaseMetadata(idForm+"/metadata")
    .subscribe(items => 
      {
        items.map(item => 
          {
            if(item.key=="questions"){
              subject.next(item.initial);
            }
        })
      });
      return subject.asObservable();
  }

  
  getQuestions(idForm:string){
    let dataList = new Array<Question>();
    let subject = new Subject<Question[]>();
    this.getFirebaseMetadata(idForm+"/questions")
    .subscribe(items => 
      {
       items.map(item => {
         let q:Question= new Question(item.key,item.description,item.last);
         dataList.push(q) 
        });
       subject.next(dataList);
      }
    );
    return subject.asObservable();
  }

  getAnswers(idForm:string) {
    let answers: AnswerBase<any>[] = [];
    let subject = new Subject<AnswerBase<any>[]>();
    this.getFirebaseMetadata(idForm+"/answers")
    .subscribe(items => 
      {
      items.map(item=> {
        let type:string = item.type;
        switch (type){
          case "radio":
          answers.push(
          new RadioQuestion({
            controlName: item.controlName,
            id: item.id,
            label: item.label,
            value: item.value,
            parent: item.parent,
            child: item.child,
            required: item.required,
            order: item.order
          }));
          break;
          case "radio_textbox":
          answers.push(
          new RadioTextboxQuestion({
            controlName: item.controlName,
            id: item.id,
            label: item.label,
            value: item.value,
            placeholder: item.placeholder,
            parent: item.parent,
            child: item.child,
            required: item.required,
            order: item.order
          }));
          break;
          case "file":
          answers.push(
            new FileQuestion({
              controlName: item.controlName,
              id: item.id,
              label: item.label,
              name: item.name,
              value: item.value,
              parent: item.parent,
              child: item.child,
              required: item.required,
              order: item.order
            }));
          break;
          case "textarea":
          answers.push(
            new TextareaQuestion({
              controlName: item.controlName,
              id: item.id,
              label: item.label,
              name: item.name,
              value: item.value,
              parent: item.parent,
              child: item.child,
              required: item.required,
              order: item.order
            }));
          break;
          case "textbox":
          answers.push(
            new TextboxQuestion({
              controlName: item.controlName,
              id: item.id,
              label: item.label,
              name: item.name,
              placeholder: item.placeholder,
              value: item.value,
              parent: item.parent,
              child: item.child,
              required: item.required,
              order: item.order
            }));
          break;
          case "textbox_next":
          answers.push(
            new TextboxButtonsQuestion({
              controlName: item.controlName,
              id: item.id,
              label: item.label,
              name: item.name,
              placeholder: item.placeholder,
              value: item.value,
              parent: item.parent,
              child: item.child,
              required: item.required,
              order: item.order,
              next: item.next,
              validations: item.validations
            }));
          break;
          default: 
          console.log("default");
        }
      });
      answers.sort((a, b) => a.order - b.order);
      subject.next(answers);
      });
      return subject.asObservable();

    }
  
  getTotalPages(idForm:string){
    let subject = new Subject<number>();
    this.getFirebaseMetadata(idForm+"/metadata")
    .subscribe(items => 
      {
        items.map(item => 
          {
            if(item.key=="pages"){
              subject.next(item.total);
            }
        })
      });
      return subject.asObservable();

      /*let questions: AnswerBase<any>[] = [

        new RadioQuestion({
          controlName: "work_type",
          id: "CARR01",
          label: "Instalación",
          name: "work_type",
          value: "Instalación",
          parent: "CARP01",
          child: "CARP02",
          type: "radio",
          required: false,
          order: 1
        }),
  
        new RadioQuestion({
          controlName: "work_type",
          id: "CARR02",
          label: "Reparación",
          name: "work_type",
          value: "Reparación",
          parent: "CARP01",
          child: "CARP02",
          type: "radio",
          required: false,
          order: 2
        }),
  
        new RadioQuestion({
          controlName: "work_type",
          id: "CARR03",
          label: "Fabricación",
          name: "work_type",
          value: "Fabricación",
          parent: "CARP01",
          child: "CARP02",
          type: "radio",
          required: false,
          order: 3
        })
      ];
      return questions.sort((a, b) => a.order - b.order);*/
  }


  createQuote(dto:QuoteDto, userId?:string, providerId?:string){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'}); 
    if(userId!=null && providerId!=null){
      return this.http.post(this.apiUrl+"?user="+userId+"&provider="+providerId, dto, {headers: headers, observe: 'response', responseType: 'text'})
      .pipe(
        map(response => {return response}),
        catchError(this.handleError)
      );
    }
  }

  getQuote(id:number){
    return this.http.get<OnlineQuoteGetDto>(this.apiUrl+"/"+id)
    .pipe(
      map((quoteInfo:OnlineQuoteGetDto)=> { 
        return quoteInfo
      }),
      catchError(this.handleError)
    );
  }

  uploadQuotationImage(file: File, quoteId:string){
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    let params = new HttpParams().set('quote',quoteId);
    return this.http.post<String>(this.apiUrl+"/images",formdata, {params: params})
    .pipe(
      map(response => { return response;}),
      catchError(this.handleError)
    );
  }

  private handleError (error: Response) {
    console.log("Se esta manejando un error");
      return Observable.throw(error.status);        
  }

}
