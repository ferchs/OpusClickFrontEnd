import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { AnswerBase }     from '../_shared/answer-base';
import { Question } from '../_models/question';
import { Observable } from "rxjs/Rx"

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  @Input() answer: AnswerBase<any>;
  @Input() form: FormGroup;
  @Input() currentQuestion:Question;

  get isValid() { 
    return this.form.controls[this.answer.controlName].valid;
  }
}

