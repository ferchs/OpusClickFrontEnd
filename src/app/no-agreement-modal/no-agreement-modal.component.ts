import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-no-agreement-modal',
  templateUrl: './no-agreement-modal.component.html',
  styleUrls: ['./no-agreement-modal.component.css']
})
export class NoAgreementModalComponent implements OnInit {
  
  @Input() title;
  mText:string;
  @Output() result = new EventEmitter<string>();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.mText=null;
  }

  confirm(){
    this.result.emit(this.mText);
  }

}
