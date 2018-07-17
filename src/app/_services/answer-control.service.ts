import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerBase } from '../_shared/answer-base';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AnswerControlService {
  constructor() { }

  toFormGroup(answers: AnswerBase<any>[] ) {
    let group: any = {};
    answers.forEach(answer => {
      group[answer.controlName] = answer.required ? new FormControl(answer.value || '', Validators.required)
                                              : new FormControl(answer.value || '');
    });
    return new FormGroup(group);
  }
}
