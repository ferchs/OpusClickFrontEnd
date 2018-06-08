import { AnswerBase } from './answer-base';

export class TextareaQuestion extends AnswerBase<string> {
  controlType = 'textarea';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
