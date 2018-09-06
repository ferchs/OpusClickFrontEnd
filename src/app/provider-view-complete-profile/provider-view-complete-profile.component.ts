import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ProviderService } from "../_services/provider.service";
import { ProviderGetProfileDto } from "../_dtos/providerGetProfileDto";
import { ProviderGetContractReviewDto} from "../_dtos/providerGetContractReviewDto";
import { Image } from "../_models/image";
import { AuthService } from '../_services/auth.service';
import { DomSanitizer } from '@angular/platform-browser'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import {Location} from '@angular/common';

@Component({
  selector: 'app-provider-view-complete-profile',
  templateUrl: './provider-view-complete-profile.component.html',
  styleUrls: ['./provider-view-complete-profile.component.css']
})
export class ProviderViewCompleteProfileComponent implements OnInit {

  provider:ProviderGetProfileDto;
  providerReviews:Array<ProviderGetContractReviewDto>;
  loading:boolean;
  loggedIn:boolean;
  userId:string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: Array<NgxGalleryImage>;
  metaGalleryImages:Map<String,Array<NgxGalleryImage>>;

  constructor(private providerService: ProviderService, private activatedRoute: ActivatedRoute,
     private authService: AuthService, private domSanitizer: DomSanitizer, private location:Location,) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
    this.loading=true;
    this.userId=localStorage.getItem("id_user");
    this.provider= new ProviderGetProfileDto();
    this.galleryOptions = [
      { "image": false, "height": "100px" },
      { "breakpoint": 500, "width": "100%" }
    ];
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.providerService.getProvider(params['experto']).subscribe((provider:ProviderGetProfileDto)=>{
        this.provider=provider;
      });
      this.galleryImages = new Array<NgxGalleryImage>();
      this.metaGalleryImages= new Map<String,Array<NgxGalleryImage>>();
      this.providerService.getProviderReviews(params['experto']).subscribe((providerReviews:Array<ProviderGetContractReviewDto>)=>{
        this.providerReviews=providerReviews;
        for(let providerReview of providerReviews){
          if(providerReview.reviewImage!=null || providerReview.reviewImage!=undefined){
            let image:Image= new Image();
            image.small=providerReview.reviewImage;
            image.medium=providerReview.reviewImage;
            image.big=providerReview.reviewImage;
            this.galleryImages = new Array<NgxGalleryImage>();
            this.galleryImages.push(image);
            this.metaGalleryImages.set(providerReview.contractName+""+providerReview.date,this.galleryImages);
          }
        }
        this.loading=false;
      });
    });
}

  getImageGallery(key:string){
    console.log(key);
    console.log(this.metaGalleryImages);
    if(key!=null && key!=undefined){
      return this.metaGalleryImages.get(key);
    }
  }

  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  back(){
      this.location.back();
  }

}
