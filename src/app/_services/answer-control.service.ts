import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AnswerBase } from '../_shared/answer-base';
import { FileValidator } from '../_directives/file-validator';

@Injectable()
export class AnswerControlService {
  constructor() { }

  toFormGroup(answers: AnswerBase<any>[] ) {
    let group: any = {};
    answers.forEach(answer => {
      if(answer.controlType=="file" || answer.controlType=="file_next"){
        group[answer.controlName] = answer.required ? new FormControl(answer.value || '',  [FileValidator.validate])
        : new FormControl(answer.value || '');
      }else{
        group[answer.controlName] = answer.required ? new FormControl(answer.value || '', Validators.required)
        : new FormControl(answer.value || '');
      }
     
    });
    return new FormGroup(group);
  }
}
