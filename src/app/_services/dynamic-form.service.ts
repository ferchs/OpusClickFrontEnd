import { Injectable }       from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DropdownQuestion } from '../_shared/answer-dropdown';
import { AnswerBase }     from '../_shared/answer-base';
import { TextboxQuestion }  from '../_shared/answer-textbox';
import { RadioQuestion }  from '../_shared/answer-radio';
import { RadioTextboxQuestion }  from '../_shared/answer-radio-textbox';
import { Question } from '../_models/question';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DynamicFormService {

  total:number;

  constructor(private firebase:AngularFireDatabase){
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
         let q:Question= new Question(item.key,item.description,item.page);
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
            name: item.name,
            value: item.value,
            parent: item.parent,
            child: item.child,
            required: item.required,
            order: item.order
          }));
          break;
          case "radio_texbox":
          answers.push(
          new RadioTextboxQuestion({
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
          case "text":
          console.log("text");
          break;
          case "textarea":
          console.log("textarea");
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


}
