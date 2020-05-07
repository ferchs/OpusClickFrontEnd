import { AnswerBase } from './answer-base';

export class FileQuestion extends AnswerBase<string> {
  controlType = 'file';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
