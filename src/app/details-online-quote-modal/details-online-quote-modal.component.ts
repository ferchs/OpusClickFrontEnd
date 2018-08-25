import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details-online-quote-modal',
  templateUrl: './details-online-quote-modal.component.html',
  styleUrls: ['./details-online-quote-modal.component.css']
})
export class DetailsOnlineQuoteModalComponent implements OnInit {

  @Input() title;
  @Input() values:string;
  properties:JSON;
  jsonProperties:any;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.properties=JSON.parse(this.values);
    this.jsonProperties = Object.keys(this.properties);
  }

}
