import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { Location } from "../_models/location";
import { UserInformationDto } from "../_dtos/userInformationDto";
import { DataService } from "../_services/data.service";
import { UserService } from "../_services/user.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-dashboard-profile',
  templateUrl: './user-dashboard-profile.component.html',
  styleUrls: ['./user-dashboard-profile.component.css']
})
export class UserDashboardProfileComponent implements OnInit {

  userDto:UserInformationDto;
  photo:File;
  location:Location;
  email:string;
  image:any;
  imageToShow: any;
  loading:boolean;

  constructor(private dataService:DataService, private userService:UserService,
    private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading=true;
    this.location= new Location();
    this.userDto= new UserInformationDto();
    this.image="../../assets/profile.svg";
    this.dataService.currentMessage.subscribe(emailUser =>{
      if(emailUser==="default message"){
        this.dataService.changeMessage(localStorage.getItem('email_user'));
        this.email=localStorage.getItem('email_user');
        this.userService.getUser(localStorage.getItem('email_user')).subscribe((userInformationDto:UserInformationDto)=>{
          this.userDto=userInformationDto;
          this.image= this.userDto.photo;
          this.location=userInformationDto.locations.pop();
          this.loading=false;
        })
      }
      else{
      this.userService.getUser(emailUser).subscribe((userInformationDto:UserInformationDto)=>{
        this.email=localStorage.getItem('email_user');
        this.userDto=userInformationDto;
        this.location=userInformationDto.locations.pop();
        this.image= this.userDto.photo;
        this.loading=false;
      })
    }
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
        let reader=new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (event:any) => {
          let base64=event.target.result
          let filename=image.name;
          let type=image.type;
          this.reduceQuality(base64,filename,type,(file)=>{
            this.userService.setUserPhoto(file,this.email)
            .subscribe((url:string)=>{
              this.image=url;
              this.userDto.photo=url;
              this.loading=false;
            });
          });
        }
    }
    else{
      this.loading=false;
    }
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

  editInformation(){
    this.router.navigateByUrl('/dashboard_usuario/perfil/editar');
  }

}
