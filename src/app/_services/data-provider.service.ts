import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Provider } from "../_models/provider";

@Injectable()
export class DataProviderService {

  private messageSource = new BehaviorSubject<Provider>(new Provider());
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: Provider) {
    this.messageSource.next(message)
  }

}