import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProviderGetProfileDto } from "../_dtos/providerGetProfileDto";

@Injectable()
export class DataProviderService {

  private messageSource = new BehaviorSubject<ProviderGetProfileDto>(new ProviderGetProfileDto());
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: ProviderGetProfileDto) {
    this.messageSource.next(message)
  }

}