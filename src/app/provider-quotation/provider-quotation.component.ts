import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Item } from '../_models/item';
import {Location} from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-provider-quotation',
  templateUrl: './provider-quotation.component.html',
  styleUrls: ['./provider-quotation.component.css']
})
export class ProviderQuotationComponent implements OnInit {

  loggedIn:boolean;
  loading:boolean;
  submited:boolean;
  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  durationTimes:string[];
  warrantyTimes:string[];
  mValue:number;
  items:Array<Item>=[];
  mModifications:string;
  administrationAmount:number;
  subtotalAmount:number;
  totalAmount:number;

  constructor(private authService: AuthService, private location:Location) { }

  ngOnInit() {
    this.loading=false;
    this.submited=false;
    this.loggedIn=this.authService.isLoggedIn();
    this.totalPage=4;
    this.actualPage=1;
    this.administrationAmount=0;
    this.subtotalAmount=0;
    this.totalAmount=0;
    this.calculateAdvancePercentage();
    this.durationTimes=['Hora(s)','Día(s)','Mes(es)','Año(s)'];
    this.warrantyTimes=['Día(s)','Mes(es)','Año(s)'];
    let element:Item= new Item();
    this.items.push(element);
    this.mModifications=null;
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

  addItem(){
    let item:Item=new Item();
    this.items.push(item)
  }

  calculatePrice(){
    this.subtotalAmount=0;
    this.items.forEach((element:Item) => {
      this.subtotalAmount+=element.value;
    });
    this.administrationAmount=Math.trunc(this.subtotalAmount*0.05);
    this.totalAmount=this.subtotalAmount+this.administrationAmount;
  }

  removeItem(index){
    this.items.splice(index, 1);
  }

  private fieldArray: Array<any> = [];
    private newAttribute: any = {};

    addFieldValue() {
        this.fieldArray.push(this.newAttribute)
        this.newAttribute = {};
    }

    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }

}
