import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unfulfilled-modal',
  templateUrl: './unfulfilled-modal.component.html',
  styleUrls: ['./unfulfilled-modal.component.css']
})
export class UnfulfilledModalComponent implements OnInit {

  @Input() title;
  @Output() result = new EventEmitter<string>();
  causes: string[] = ["No cumplió con la fecha y hora acordada","Canceló la visita a última hora", "Otra"];
  mCause:string;
  mOther:string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.mCause=null;
    this.mOther=null;
  }

  report(){
    if(this.mCause=="Otra"){
      this.result.emit(this.mOther);
    }else{
      this.result.emit(this.mCause);
    }
  }

}
