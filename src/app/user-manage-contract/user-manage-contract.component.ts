import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {Location} from '@angular/common';
import { Item } from '../_models/item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsQuotationModalComponent } from '../details-quotation-modal/details-quotation-modal.component';

@Component({
  selector: 'app-user-manage-contract',
  templateUrl: './user-manage-contract.component.html',
  styleUrls: ['./user-manage-contract.component.css']
})
export class UserManageContractComponent implements OnInit {

  loggedIn:boolean;
  loading:boolean;
  submited:boolean;
  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  items:Array<Item>=[];
  administrationAmount:number;
  subtotalAmount:number;
  totalAmount:number;
  mFinalize:boolean;
  touched:boolean;


  constructor(private authService: AuthService, private location:Location, 
    private modalService: NgbModal) { 
    this.loading=false;
    this.submited=false;
    this.loggedIn=this.authService.isLoggedIn();
    this.totalPage=4;
    this.actualPage=1;
    this.calculateAdvancePercentage();
    this.administrationAmount=0;
    this.subtotalAmount=0;
    this.totalAmount=0;
    this.touched=false;
    this.mFinalize=true;
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

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  next(){
    this.actualPage=(this.actualPage+1);
    this.calculateAdvancePercentage();
  }

  back(){
    if(this.actualPage==1){
      this.location.back();
    }
    else{
    this.actualPage=(this.actualPage-1);
    this.calculateAdvancePercentage();
    }
  }

  detailsItem(item:Item){
    const modalRef = this.modalService.open(DetailsQuotationModalComponent);
    modalRef.componentInstance.title = 'Detalles de item';
    modalRef.componentInstance.item = item;
  }

  calculatePrice(){
    this.subtotalAmount=0;
    this.items.forEach((element:Item) => {
      this.subtotalAmount+=element.value;
    });
    this.administrationAmount=Math.trunc(this.subtotalAmount*0.05);
    this.totalAmount=this.subtotalAmount+this.administrationAmount;
  }
  
  finalize(resp:boolean){
    this.touched=true;
    if(resp==false){
      this.percentageCompletion=100;
    }
    else{
      this.calculateAdvancePercentage();
    }
    this.mFinalize=resp;
  }

}
