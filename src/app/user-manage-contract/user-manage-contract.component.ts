import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {Location} from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsQuotationModalComponent } from '../details-quotation-modal/details-quotation-modal.component';
import { ProviderQuoteService } from '../_services/provider-quote.service';
import { ProviderQuoteDto } from '../_dtos/providerQuoteDto';
import { Item } from '../_models/item';
import { Milestone } from '../_models/milestone';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import { ContractService } from '../_services/contract.service';
import { ContractDto } from '../_dtos/contractDto';
import { WorkUpdateDto } from "../_dtos/workUpdateDto";
import { WorkService } from "../_services/work.service";
import { WorkGetDto } from "../_dtos/workGetDto";
import { PaymentService } from '../_services/payment.service';
import { ContractGetDto } from '../_dtos/contractGetDto';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-manage-contract',
  templateUrl: './user-manage-contract.component.html',
  styleUrls: ['./user-manage-contract.component.css']
})
export class UserManageContractComponent implements OnInit {

  loading:boolean;
  submited:boolean;
  loggedIn:boolean;
  isUserFirtsService:boolean;
  workId:string;
  providerQuote:ProviderQuoteDto;
  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  mFinalize:string;
  accepted:boolean;
  selected:boolean;
  fileName:string;
  canContnue:boolean;
  photo:File;
  image:any;
  mName:string;
  contract:ContractDto;
  milestones:Array<Milestone>;
  sendContractProvider:boolean;
  paymentMade:boolean;

  constructor(private authService: AuthService, 
    private providerQuoteService:ProviderQuoteService,
    private location:Location, 
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private domSanitizer: DomSanitizer, 
    private contractService:ContractService,
    private workService:WorkService,
    private userService:UserService,
    private paymentService:PaymentService) { 
  }

  ngOnInit() {
    this.loading=true;
    this.sendContractProvider=false;
    this.paymentMade=false;
    this.providerQuote=new ProviderQuoteDto();
    this.contract= new ContractDto();
    this.providerQuote.items=[];
    this.milestones= new Array<Milestone>();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.workId=params['work'];
    });
    this.userService.isFirtsService(+localStorage.getItem("id_user")).subscribe(firtsService=>{
      console.log(firtsService)
      this.isUserFirtsService=firtsService;
    });
    this.providerQuoteService.getProviderQuote(this.workId)
    .subscribe((quote:ProviderQuoteDto)=>
    {
      this.providerQuote=quote;
      this.loading=false;
    });
    this.mName=null;
    this.submited=false;
    this.selected=false;
    this.loggedIn=this.authService.isLoggedIn();
    this.fileName="Seleccionar una imagen";
    this.totalPage=7;
    this.actualPage=1;
    this.calculateAdvancePercentage();
    this.mFinalize=null;
    this.accepted=false;
  }

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  canContinue(){
    this.verifySelectedItems();
    if(this.selected){
      this.actualPage=(this.actualPage+1);
      this.calculateAdvancePercentage();
      this.canContnue=true;
    }
    else{
      this.canContnue=false;
    }
  }

  next(){
    if(this.mFinalize=='yes'){
      this.percentageCompletion=100;
      this.actualPage=(this.actualPage+1);
    }else{
      this.actualPage=(this.actualPage+1);
      this.calculateAdvancePercentage();
    }
  }

  back(){
    if(this.actualPage==1){
      this.location.back();
    }
    else{
      this.actualPage=(this.actualPage-1);
      this.calculateAdvancePercentage();
      if(this.actualPage==4){
        this.mFinalize=null;
      }
    }
  }

  detailsItem(item:Item){
    const modalRef = this.modalService.open(DetailsQuotationModalComponent);
    modalRef.componentInstance.title = 'Detalles de item';
    modalRef.componentInstance.item = item;
  }
  
  verifySelectedItems(){
    this.selected=false;
    for (let item of this.providerQuote.items) {
      if(item.selected==true){
        this.selected=true;
        break;
      }
    }
  }

  onFileChange(event, milestone:Milestone) {
    this.loading=true;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.photo = event.target.files[0];
      reader.readAsDataURL(this.photo);
      reader.onload = (event: any) => {
        let pos:number=this.contract.milestones.indexOf(milestone);
        let newItem:Item=this.contract.milestones[pos].item;
        newItem.imageContract=event.target.result;
        this.contract.milestones[pos].item=newItem;
        this.loading=false;
      }
    }
  }

  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  finalize(resp:string){
    this.mFinalize=resp;
    if(resp=='yes'){
      this.percentageCompletion=75;
    }
    else{
      this.calculateAdvancePercentage();
    }
  }


  generateContract(contractState:string,milestoneState:string){
    this.contract=new ContractDto();
    this.milestones= new Array<Milestone>();
    this.contract.subtotal=0;
    for (let item of this.providerQuote.items) {
      if(item.selected==true){
        this.contract.subtotal+=item.value;
        let milestone:Milestone= new Milestone();
        milestone.item=new Item();
        milestone.item.id=item.id;
        milestone.item.name=item.name;
        milestone.item.value=item.value;
        milestone.item.durationValue=item.durationValue;
        milestone.item.durationTime=item.durationTime;
        milestone.item.warrantyValue=item.warrantyValue;
        milestone.item.warrantyTime=item.warrantyTime;
        milestone.item.workDescription=item.workDescription;
        milestone.item.warrantyDescription=item.warrantyDescription;
        milestone.item.imageQuote=item.imageQuote;
        milestone.item.commentQuote=item.commentQuote;
        milestone.item.imageContract=item.imageQuote;
        milestone.item.commentContract=item.commentQuote;
        milestone.state=milestoneState;
        this.milestones.push(milestone);
      }
    }
    this.contract.name=this.mName;
    this.contract.milestones=this.milestones;
    this.contract.administrationFee=+(this.contract.subtotal*0.1).toFixed(2);
    let partialTotal=this.contract.subtotal+this.contract.administrationFee;
    this.contract.totalValue=this.isFirstService()?+this.contract.subtotal.toFixed(2):+partialTotal.toFixed(2); 
    this.contract.clarifications=this.providerQuote.clarifications;
    this.contract.state=contractState;
  }

  isFirstService(){
    return this.isUserFirtsService;
  }

  sendContract(){
    this.loading=true;
    this.contractService.createContract(this.contract,this.workId).subscribe(()=>{
      this.loading=false;
      this.sendContractProvider=true;
    });
  }

  makePayment(){
    this.loading=true;
    this.contractService.createContract(this.contract,this.workId).subscribe(()=>{
    this.paymentService.makePayment(this.workId,this.contract.totalValue,this.contract.name);
    })
  }

  /*this.contractService.createContract(this.contract,this.workId).subscribe(()=>{
      this.workService.getWorkById(this.workId).subscribe((work:WorkGetDto)=>{
        let dto:WorkUpdateDto = new WorkUpdateDto();
        dto.id=+this.workId;
        dto.providerLabel=work.providerLabel;
        dto.userLabel=work.providerLabel;
        dto.comment=work.comment;
        dto.state="IN_PROGRESS";
        this.workService.updateWork(dto).subscribe(()=>{
          this.loading=false
          this.paymentMade=true;
        });
      });
    }); */

}