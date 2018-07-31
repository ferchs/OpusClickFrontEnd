import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params, RoutesRecognized, NavigationEnd} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import {Location} from '@angular/common';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  totalPage:number;
  actualPage:number;
  percentageCompletion:number;
  mSatisfactionLevel:number;
  mDescription:string;
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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private location:Location, private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
    this.fileName="Seleccionar un archivo";
    this.loading=true;
    this.touched=false;
    this.mRecommend=true;
    this.mSatisfactionLevel=0;
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
    //this.loading=true;
  }

  calculateAdvancePercentage(){
    this.percentageCompletion=(this.actualPage/this.totalPage)*100;
  }

  recommend(resp:boolean){
    this.touched=true;
    this.mRecommend=resp;
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
        this.loading=false;
      }
    }
  }

}