import { AnswerBase } from './answer-base';

export class RadioQuestion extends AnswerBase<string> {
  controlType = 'radio';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
