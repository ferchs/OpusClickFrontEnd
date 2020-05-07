export class AnswerBase<T>{
  controlName:string;
  id: string;
  value: T;
  parent: string;
  child: string;
  label: string;
  name: string;
  placeholder:string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(options: {
      controlName?:string,
      id?: string,
      value?: T,
      parent?: string,
      child?: string,
      label?: string,
      name?: string,
      placeholder?: string,
      required?: boolean,
      order?: number,
      controlType?: string
    } = {}) {
    this.controlName = options.controlName || '';
    this.id = options.id || '';
    this.value = options.value;
    this.parent = options.parent || '';
    this.child = options.child || '';
    this.label = options.label || '';
    this.name = options.name || '';
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
