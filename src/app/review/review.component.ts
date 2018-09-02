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
  mRecommend:boolean;
  touched:boolean;
  userId:string;
  providerId:string;
  workId:string;
  loading:boolean;
  submited:boolean;
  loggedIn:boolean;
  someRange2config: any = {
    behaviour: 'drag',
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
    this.mRecommend=true;
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
    this.reviewService.createReview(this.review,this.workId).subscribe(res=>{
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
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.photo = event.target.files[0];
      this.fileName=this.photo.name;
      reader.readAsDataURL(this.photo);
      reader.onload = (event: any) => {
        this.image=event.target.result;
        this.review.image=event.target.result;
        this.loading=false;
      }
    }
  }

  setCommentType(comment:string){
    this.review.type=comment;
  }

}