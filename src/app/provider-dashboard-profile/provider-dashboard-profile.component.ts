import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { ProviderGetProfileDto } from "../_dtos/providerGetProfileDto";
import { DataService } from "../_services/data.service";
import { DataProviderService } from "../_services/data-provider.service";
import { ProviderService } from "../_services/provider.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-dashboard-profile',
  templateUrl: './provider-dashboard-profile.component.html',
  styleUrls: ['./provider-dashboard-profile.component.css']
})
export class ProviderDashboardProfileComponent implements OnInit {

  provider:ProviderGetProfileDto;
  photo:File;
  image:any;
  imageToShow: any;
  loading:boolean;

  constructor(private dataService:DataService, private dataProviderService:DataProviderService, 
    private providerService:ProviderService,private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading=true;
    this.provider= new ProviderGetProfileDto();
    this.image="../../assets/profile.svg";
    this.providerService.getProvider(localStorage.getItem("id_provider")).subscribe((provider:ProviderGetProfileDto)=>{
      this.provider=provider;
        if(provider.photo!=undefined || provider.photo==null || provider.photo.length<1){
          this.image=provider.photo;
        }
        this.loading=false;
    });
  }

  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
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
            this.providerService.setProviderPhoto(result,this.provider.id)
            .subscribe((url:string)=>{
            this.image=url;
            this.provider.photo=url;
            this.dataProviderService.changeMessage(this.provider);
            this.loading=false;
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
            this.providerService.setProviderPhoto(file,this.provider.id)
          .subscribe((url:string)=>{
            this.image=url;
            this.provider.photo=url;
            this.dataProviderService.changeMessage(this.provider);
            this.loading=false;
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

  
  editInformation(){
    this.router.navigateByUrl('/dashboard_experto/perfil/editar');
  }

}
