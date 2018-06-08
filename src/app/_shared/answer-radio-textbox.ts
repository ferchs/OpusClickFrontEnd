import { AnswerBase } from './answer-base';

export class RadioTextboxQuestion extends AnswerBase<string> {
  controlType = 'radio_texbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
