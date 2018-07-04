import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title;
  @Input() content;
  @Output() result = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  confirm(response:boolean){
    this.result.emit(response);
  }

}
