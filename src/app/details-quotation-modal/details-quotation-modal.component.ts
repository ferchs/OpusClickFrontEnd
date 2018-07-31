import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Item } from '../_models/item';

@Component({
  selector: 'app-details-quotation-modal',
  templateUrl: './details-quotation-modal.component.html',
  styleUrls: ['./details-quotation-modal.component.css']
})
export class DetailsQuotationModalComponent implements OnInit {

  @Input() title;
  @Input() item:Item;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
