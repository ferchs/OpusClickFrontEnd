import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { VisitGetDto} from "../_dtos/visitGetDto";

@Component({
  selector: 'app-details-visit-modal',
  templateUrl: './details-visit-modal.component.html',
  styleUrls: ['./details-visit-modal.component.css']
})
export class DetailsVisitModalComponent implements OnInit {

  @Input() title;
  @Input() visit:VisitGetDto;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
}
