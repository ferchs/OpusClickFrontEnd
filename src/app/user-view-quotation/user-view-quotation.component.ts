import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Item } from '../_models/item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsQuotationModalComponent } from '../details-quotation-modal/details-quotation-modal.component';

@Component({
  selector: 'app-user-view-quotation',
  templateUrl: './user-view-quotation.component.html',
  styleUrls: ['./user-view-quotation.component.css']
})
export class UserViewQuotationComponent implements OnInit {

  loading:boolean;
  submited:boolean;
  loggedIn:boolean;
  items:Array<Item>=[];
  administrationAmount:number;
  subtotalAmount:number;
  totalAmount:number;

  constructor(private authService: AuthService, private modalService: NgbModal) { 
    this.loggedIn=this.authService.isLoggedIn();
    this.loading=false;
    this.submited=false;
    this.administrationAmount=0;
    this.subtotalAmount=0;
    this.totalAmount=0;
    let i:Item= new Item();
    i.name="Fabricación Ventana";
    i.value=1200000;
    i.warrantyValue= 2;
    i.durationValue= 4;
    i.warrantyTime="Meses"
    i.durationTime="Meses"
    i.warrantyDescription="Se da garantía por defectos de fabricación o si le cae gorgojo a los materiales"
    i.workDescription="Puerta fabricada en madera cedro con estructura metalica interna"
    this.items.push(i);
    this.calculatePrice();
  }

  ngOnInit() {
  }

  calculatePrice(){
    this.subtotalAmount=0;
    this.items.forEach((element:Item) => {
      this.subtotalAmount+=element.value;
    });
    this.administrationAmount=Math.trunc(this.subtotalAmount*0.05);
    this.totalAmount=this.subtotalAmount+this.administrationAmount;
  }

  detailsItem(item:Item){
    const modalRef = this.modalService.open(DetailsQuotationModalComponent);
    modalRef.componentInstance.title = 'Detalles de item';
    modalRef.componentInstance.item = item;
  }

}
