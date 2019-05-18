import { AnswerBase } from './answer-base';

export class FileButtonsQuestion extends AnswerBase<string> {
  controlType = 'file_next';
  type: string;
  next: string;
  validations: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.next = options['next'] || '';
    this.validations = options['validations'] || '';
  }
}