import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ProviderService } from "../_services/provider.service";
import { ProviderGetProfileDto } from "../_dtos/providerGetProfileDto";
import { ProviderGetContractReviewDto} from "../_dtos/providerGetContractReviewDto";
import { Image as AliasImage} from "../_models/image";
import { AuthService } from '../_services/auth.service';
import { DomSanitizer } from '@angular/platform-browser'
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import {Location} from '@angular/common';
import { ReviewService } from '../_services/review.service';

@Component({
  selector: 'app-provider-dashboard-negotiation-finished',
  templateUrl: './provider-dashboard-negotiation-finished.component.html',
  styleUrls: ['./provider-dashboard-negotiation-finished.component.css']
})
export class ProviderDashboardNegotiationFinishedComponent implements OnInit {

  provider:ProviderGetProfileDto;
  providerReviews:Array<ProviderGetContractReviewDto>;
  loading:boolean;
  fileName:string;
  photo:File;
  image:any;
  providerId:string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: Array<NgxGalleryImage>;
  metaGalleryImages:Map<String,Array<NgxGalleryImage>>;

  constructor(private providerService: ProviderService, private reviewService: ReviewService,
    private domSanitizer: DomSanitizer, private location:Location, private router:Router) { }

  ngOnInit() {
    this.loading=true;
    this.fileName="Elige Una Imagen";
    this.providerId=localStorage.getItem("id_provider");
    this.provider= new ProviderGetProfileDto();
    this.galleryOptions = [
      { "image": false, "height": "100px" },
      { "breakpoint": 500, "width": "100%" }
    ];
      this.galleryImages = new Array<NgxGalleryImage>();
      this.metaGalleryImages= new Map<String,Array<NgxGalleryImage>>();
      this.providerService.getProviderReviews(this.providerId).subscribe((providerReviews:Array<ProviderGetContractReviewDto>)=>{
        this.providerReviews=providerReviews;
        for(let providerReview of providerReviews){
          if(providerReview.reviewImage!=null || providerReview.reviewImage!=undefined){
            let image:AliasImage= new AliasImage();
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
    
}

  getImageGallery(key:string){
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

  onFileChange(event,id) {
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
            this.reviewService.updateReviewImage(result,id).subscribe(result=>{
              this.loading=false;
              this.router.navigateByUrl('/dashboard_experto/negociaciones/finalizadas');
              this.ngOnInit();
            });
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
            this.reviewService.updateReviewImage(file,id).subscribe(result=>{
              this.loading=false;
              this.router.navigateByUrl('/dashboard_experto/negociaciones/finalizadas');
              this.ngOnInit();
            });
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
