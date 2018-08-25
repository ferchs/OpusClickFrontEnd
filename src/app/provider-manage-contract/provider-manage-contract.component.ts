import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Item } from '../_models/item';
import { ContractGetDto } from '../_dtos/contractGetDto';
import { MilestoneGetDto } from '../_dtos/milestoneGetDto';
import { ItemGetDto } from '../_dtos/itemGetDto';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import { ContractService } from '../_services/contract.service';
import { DetailsQuotationModalComponent } from '../details-quotation-modal/details-quotation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-provider-manage-contract',
  templateUrl: './provider-manage-contract.component.html',
  styleUrls: ['./provider-manage-contract.component.css']
})
export class ProviderManageContractComponent implements OnInit {

  loggedIn:boolean;
  loading:boolean;
  submited:boolean;
  accepted:boolean;
  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  durationTimes:string[];
  warrantyTimes:string[];
  mValue:number;
  mModifications:string;
  workId:string;
  contract:ContractGetDto;
  photo:File;
  image:any;

  constructor(private authService: AuthService, private location:Location,
    private router: Router, private activatedRoute: ActivatedRoute,private modalService: NgbModal,
    private domSanitizer: DomSanitizer, private contractService:ContractService) { }

  ngOnInit() {
    this.durationTimes=['Hora(s)','Día(s)','Mes(es)','Año(s)'];
    this.warrantyTimes=['Día(s)','Mes(es)','Año(s)'];
    this.loggedIn=this.authService.isLoggedIn();
    this.totalPage=6;
    this.actualPage=1;
    this.calculateAdvancePercentage();
    this.submited=false;
    this.accepted=false;
    this.contract= new ContractGetDto();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.workId=params['contract'];
      });
    this.contractService.getContract(this.workId).subscribe((contract:ContractGetDto)=>{
      this.contract=contract;
    });

    /*this.contract.milestones
      this.quote= new ProviderQuoteDto();
      this.quote.items=[];
      this.loading=false;
      this.submited=false;
      this.loggedIn=this.authService.isLoggedIn();
      this.totalPage=5;
      this.actualPage=1;
      this.quote.administrationFee=0;
      this.quote.subtotal=0;
      this.quote.total=0;
      this.calculateAdvancePercentage();
      this.durationTimes=['Hora(s)','Día(s)','Mes(es)','Año(s)'];
      this.warrantyTimes=['Día(s)','Mes(es)','Año(s)'];
      let element:Item= new Item();
      this.quote.items.push(element);
      this.mModifications=null;*/
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
      if(this.actualPage==2){
        this.contractService.getContract(this.workId).subscribe((contract:ContractGetDto)=>{
          this.contract=contract;
        });
        this.actualPage=(this.actualPage-1);
        this.calculateAdvancePercentage();
      }
      else{
        this.actualPage=(this.actualPage-1);
        this.calculateAdvancePercentage();
      }
    }
  }
  
  calculatePrice(){
    this.contract.subtotal=0;
    this.contract.milestones.forEach((element:MilestoneGetDto) => {
      this.contract.subtotal+=element.item.value;
    });
    this.contract.administrationFee=Math.trunc(this.contract.subtotal*0.05);
    this.contract.totalValue=this.contract.subtotal+this.contract.administrationFee;
  }
    

  detailsItem(item:Item){
    const modalRef = this.modalService.open(DetailsQuotationModalComponent);
    modalRef.componentInstance.title = 'Detalles de item';
    modalRef.componentInstance.item = item;
  }

  onFileChange(event, milestone:MilestoneGetDto) {
    this.loading=true;
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.photo = event.target.files[0];
      reader.readAsDataURL(this.photo);
      reader.onload = (event: any) => {
        let pos:number=this.contract.milestones.indexOf(milestone);
        let newItem:ItemGetDto=this.contract.milestones[pos].item;
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
  
  acceptContract(){
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = '¿Estas seguro de aceptar este contrato?';
    modalRef.componentInstance.content = 'Si aceptas este contrato estas aceptando todas las condiciones descritas.';
    modalRef.componentInstance.result.subscribe(response=>{
      if(response==true){
        this.loading=true;
        this.contract.state="CONTRACT_ACCEPTED_BY_PROVIDER";
        this.contractService.updateContract(this.contract).subscribe(res=>{
          this.loading=false
          this.accepted=true;
        });
      }
    });
  }

  sendQuote(){
    this.loading=true;
    this.contract.state="CONTRACT_MODIFIED_BY_PROVIDER";
    this.contractService.updateContract(this.contract).subscribe(res=>{
      this.loading=false;
      this.submited=true;
    });
  }
}
