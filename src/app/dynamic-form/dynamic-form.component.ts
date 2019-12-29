import { Component, Input, OnInit, ChangeDetectorRef }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { AnswerBase }              from '../_shared/answer-base';
import { AnswerControlService }    from '../_services/answer-control.service';
import { DynamicFormService } from '../_services/dynamic-form.service';
import { Question } from '../_models/question';
import { Observable } from "rxjs/Rx"
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuoteDto } from "../_dtos/quoteDto";
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Location} from '@angular/common';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ AnswerControlService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() answers$: Observable<AnswerBase<any>[]>;
  form: FormGroup;
  payLoad = '';
  questionsList : Map<string, Question>;
  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  currentQuestion:Question;
  previousQuestion:Question;
  backwardQuestions:Array<string>;
  loading:boolean;
  fileName:string;
  photo:File;
  image:any;
  nextDisable:boolean;
  userId:string;
  providerId:string;
  formId:string;
  submitted:boolean;


  constructor(private qcs: AnswerControlService, 
    private dynamicFormervice: DynamicFormService,
    private activatedRoute: ActivatedRoute, 
    private location:Location,
    private router:Router) {  }

  ngOnInit() {
    this.loading=true;
    this.submitted=false;
    this.fileName="Seleccionar un archivo";
    this.nextDisable=true;
    this.backwardQuestions= new Array();
    this.currentQuestion=new Question('','',false);
    this.form= new FormGroup({});
    this.questionsList= new Map<string, Question>();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId=params['user'];
      this.providerId=params['provider'];
      this.formId=params['form'];
        this.dynamicFormervice.getTotalPages(this.formId).subscribe(total => {
          this.totalPage=total;
          this.actualPage=1;
          this.calculateAdvancePercentage();
            this.dynamicFormervice.getQuestions(this.formId).subscribe(items =>{
              items.map(item =>{
                this.questionsList.set(item.id,item);
              });
            this.dynamicFormervice.getInitialQuestionId(this.formId).subscribe(id =>{
              this.currentQuestion=this.questionsList.get(id);
              this.previousQuestion=this.currentQuestion;
              this.loading=false;
            });
          });
        });
    });
    this.answers$.subscribe(a=>{
      this.form = this.qcs.toFormGroup(a);
    });
  }

  onSubmit() {
    this.loading=true;
    this.payLoad=JSON.stringify(this.form.value);
    let quote:QuoteDto = new QuoteDto();
    quote.requirements= this.payLoad;
    this.dynamicFormervice.createQuote(quote,this.userId,this.providerId).subscribe((resp:HttpResponse<String>)=>{
      this.dynamicFormervice.uploadQuotationImage(this.photo,resp.body.substring(resp.body.indexOf(':')+1,resp.body.lastIndexOf('"'))).
      subscribe(resp => {
        this.submitted=true;
        this.loading=false;
      });
    });
  }

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  next(validatios:string, childId:string){
    if(validatios!=null){
      let controlRestrictions:string[]=validatios.split(',');
      let validCount=0;
      for (let cr of controlRestrictions) {
        if(this.form.get(cr).status=='VALID'){
          validCount++;
        }
     }
     if(validCount==controlRestrictions.length){
       this.nextDisable=false;
       this.backwardQuestions.push(this.currentQuestion.id);
       this.currentQuestion=this.questionsList.get(childId);
       if(this.currentQuestion.last==true){
        this.percentageCompletion=100;
       }else{
        this.actualPage=(this.actualPage+1);
        this.calculateAdvancePercentage();
       }
     }
    }else{
      this.backwardQuestions.push(this.currentQuestion.id);
      this.currentQuestion=this.questionsList.get(childId);
      if(this.currentQuestion.last==true){
        this.percentageCompletion=100;
      }else{
       this.actualPage=(this.actualPage+1);
       this.calculateAdvancePercentage();
      }
    }
  }

  back(){
    if(this.actualPage==1){
      this.location.back();
    }
    else{
      let questionId:string = this.backwardQuestions.pop();
      this.currentQuestion=this.questionsList.get(questionId);
      this.actualPage=(this.actualPage-1);
      this.calculateAdvancePercentage();
    }
  }

  cancel(){
    this.navegateToProfessionForm();
  }

  navegateToProfessionForm(){
    switch (this.formId) {
      case 'ALB00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '1' } });
        break;
      case 'CAR00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '2' } });
        break;
      case 'DIS00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '3' } });
        break;
      case 'ELE00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '4' } });
        break;  
      case 'CLI00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '5' } });
        break;
      case 'FUM00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '6' } });
        break;
      case 'MAQ00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '7' } });
        break;
      case 'PIN00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '8' } });
        break;
      case 'PLO00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '9' } });
        break;
      case 'JAR00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '10' } });
        break;
      case 'SOL00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '11' } });
        break;
      case 'TAP00PR':
        this.router.navigate(['/expertos'], { queryParams: { profession: '12' } });
        break;
      default:
  }
  }

  onFileChange(event) {
    this.loading=true;
    if(event.target.files && event.target.files.length > 0) {
    let image:File = event.target.files[0];
    this.getOrientation(image,(orientation)=>{
      if(orientation!=1 && orientation!=0){
        let reader=new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event:any) => {
          let base64=event.target.result
          let filename=image.name;
          let type=image.type;
          this.fixExifOrientation(base64,orientation,filename,type,(result)=>{
            this.photo = result;
            this.fileName=this.photo.name;
            this.loading=false;
          });
        }
      }
      else{
        let reader=new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event:any) => {
          let base64=event.target.result
          let filename=image.name;
          let type=image.type;
          this.reduceQuality(base64,filename,type,(file)=>{
            this.photo = file;
            this.fileName=this.photo.name;
            this.loading=false;
          });
        }
      }
    });
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

  getOrientation(file, callback) {

    var reader:any,
    target:EventTarget;
    reader = new FileReader();
    reader.onload = (event) => {

      var view = new DataView(event.target.result);

      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

      var length = view.byteLength,
        offset = 2;

      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;

        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) {
            return callback(-1);
          }
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;

          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };

    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  };

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
      url = canvas.toDataURL('image/jpeg', 0.7);
    }
    else{
      url = canvas.toDataURL();
    }
    let file:File=this.dataURLtoFile(url,filename);
    callback(file);
  };
    image.src = base64Image;  
  }

  fixExifOrientation(base64Image, srcOrientation, filename,extension,callback){
    let canvas = document.createElement('canvas');
    let ctx=canvas.getContext("2d");
    var image = new Image();
   image.onload = ()=>{
  	var width = image.width,
    		height = image.height,
        canvas = document.createElement('canvas'),
	  		ctx = canvas.getContext("2d");
		
    // set proper canvas dimensions before transform & export
		if (4 < srcOrientation && srcOrientation < 9) {
    	canvas.width = height;
      canvas.height = width;
    } else {
    	canvas.width = width;
      canvas.height = height;
    }
	
  	// transform context before drawing image
		switch (srcOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
    }

		// draw image
    ctx.drawImage(image, 0, 0);
    
    let url:string = '';
    if(extension=='image/jpeg'){
      url = canvas.toDataURL('image/jpeg', 0.7);
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

}

