import { AnswerBase } from './answer-base';

export class RadioTextboxQuestion extends AnswerBase<string> {
  controlType = 'radio_textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
