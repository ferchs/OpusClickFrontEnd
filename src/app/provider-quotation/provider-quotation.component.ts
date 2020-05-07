import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Item } from '../_models/item';
import { ProviderQuoteDto } from '../_dtos/providerQuoteDto';
import {Location} from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import { ProviderQuoteService } from '../_services/provider-quote.service';

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
  mModifications:string;
  workId:string;
  quote:ProviderQuoteDto;
  photo:File;
  image:any;

  constructor(private authService: AuthService, private location:Location,
    private router: Router, private activatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer, private providerQuoteService:ProviderQuoteService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.workId=params['work'];
    });
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
    this.mModifications=null;
    this.image="";
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
    this.quote.items.push(item)
  }

  calculatePrice(){
    this.quote.subtotal=0;
    this.quote.items.forEach((element:Item) => {
      this.quote.subtotal+=element.value;
    });
    this.quote.administrationFee=Math.trunc(this.quote.subtotal*0.1);
    this.quote.total=this.quote.subtotal+this.quote.administrationFee;
  }

  removeItem(index){
    this.quote.items.splice(index, 1);
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

    onFileChange(event, item:Item) {
      this.loading=true;
      if(event.target.files && event.target.files.length > 0) {
      let image:File = event.target.files[0];
          let reader=new FileReader();
          reader.readAsDataURL(image);
          reader.onload = (event:any) => {
            let base64=event.target.result
            let filename=image.name;
            let type=image.type;
            this.reduceQuality(base64,filename,type,(file)=>{
              this.getBase64(file,(img)=>{
                let pos:number=this.quote.items.indexOf(item);
                let newItem:Item=this.quote.items[pos];
                newItem.imageQuote=img;
                this.quote.items[pos]=newItem;
                this.loading=false;
              });
            });
          }
      }
      else{
        this.loading=false;
      }
    }

     getBase64(file,callback) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        let result = reader.result;
        callback(result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }

    reduceQuality(base64Image,filename,extension,callback){
      let canvas = document.createElement('canvas');
      let ctx=canvas.getContext("2d");
      var image = new Image();
     image.onload = ()=>{
      var width = image.width,
          height = image.height,
          canvas = document.createElement('canvas'),
          ctx = canvas.getContext("2d");
      
      // set proper canvas dimensions before transform & export
        canvas.width = width;
        canvas.height = height;
  
      // draw image
      ctx.drawImage(image, 0, 0);
      
      let url:string = '';
      if(extension=='image/jpeg'){
        url = canvas.toDataURL('image/jpeg', 0.1);
      }
      else{
        url = canvas.toDataURL();
      }
      let file:File=this.dataURLtoFile(url,filename);
      callback(file);
    };
      image.src = base64Image;  
    }

    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
  }

    makeTrustedImage(item) {
      const style = 'url(' + item + ')';
      return this.domSanitizer.bypassSecurityTrustStyle(style);
    }

    sendQuote(){
      this.loading=true;
      this.providerQuoteService.createProviderQuote(this.quote,this.workId).subscribe(res=> {
        this.loading=false;
        this.submited=true;
      });
    }
}
