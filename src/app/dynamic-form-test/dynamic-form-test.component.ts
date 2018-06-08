import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { AnswerBase }              from '../_shared/answer-base';
import { AnswerControlService }    from '../_services/answer-control.service';
import { DynamicFormService } from '../_services/dynamic-form.service';
import { Question } from '../_models/question';
import { Observable } from "rxjs/Rx"

@Component({
  selector: 'app-dynamic-form-test',
  templateUrl: './dynamic-form-test.component.html',
  styleUrls: ['./dynamic-form-test.component.css'],
  providers: [ AnswerControlService ]
})
export class DynamicFormTestComponent implements OnInit {
  @Input() answers$: Observable<AnswerBase<any>[]>;
  //@Input() answers:AnswerBase<any>[];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: AnswerControlService, private service: DynamicFormService) {  }

  ngOnInit() {
    this.form= new FormGroup({});
    this.answers$.subscribe(a=>this.form = this.qcs.toFormGroup(a));
    //this.form=this.qcs.toFormGroup(this.answers);
  }

  onSubmit() {
    this.payLoad=JSON.stringify(this.form.value);
    console.log(this.payLoad);
    console.log(this.form);
  }
}
