import { AnswerBase } from './answer-base';

export class TextboxQuestion extends AnswerBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
