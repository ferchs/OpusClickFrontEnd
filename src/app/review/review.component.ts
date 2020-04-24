import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params, RoutesRecognized, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import {Location} from '@angular/common';
import { AuthService } from '../_services/auth.service';
import { ReviewService } from '../_services/review.service';
import {ReviewDto} from '../_dtos/reviewDto';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  review:ReviewDto;
  image:any;
  fileName:string;
  photo:File;
  touched:boolean;
  userId:string;
  providerId:string;
  workId:string;
  loading:boolean;
  submited:boolean;
  loggedIn:boolean;
  someRange2config: any = {
    behaviour: 'drag',
    connect: [true, false],
    tooltips: {
      to (value: number){
        return value+'%';
      }
    }
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location:Location,
     private authService: AuthService, private reviewService: ReviewService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
    this.review= new ReviewDto();
    this.fileName="Seleccionar un archivo";
    this.loading=true;
    this.touched=false;
    this.totalPage=4;
    this.actualPage=1;
    this.calculateAdvancePercentage();
    this.submited=false;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId=params['user'];
      this.providerId=params['provider'];
      this.workId=params['work'];
      this.loading=false;
    });  
  }

  submit(){
    this.loading=true;
    this.reviewService.createReview(this.review,this.workId).subscribe(()=>{
      this.loading=false;
      this.submited=true;
    });
  }

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  recommend(resp:boolean){
    this.touched=true;
    this.review.recommend=resp;
  }

  next(){
    this.actualPage=(this.actualPage+1);
    this.calculateAdvancePercentage();
  }

  back(){
    this.touched=false;
    if(this.actualPage==1){
      this.location.back();
    }
    else{
    this.actualPage=(this.actualPage-1);
    this.calculateAdvancePercentage();
    }
  }

  onFileChange(event) {
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
              this.review.image=img;
              this.fileName=filename;
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

  setCommentType(commentType:string){
    this.review.type=commentType;
  }

}