import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { UserInformationDto } from "../_dtos/userInformationDto";
import { DataService } from "../_services/data.service";
import { UserService } from "../_services/user.service";
import { ProfessionService } from '../_services/profession.service';
import { CityService } from '../_services/city.service';
import { City } from '../_models/city';
import { Location } from '../_models/location';
import { Profession } from '../_models/profession';
import { UserUpdateProfileDto } from "../_dtos/userUpdateDto";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-profile-edit',
  templateUrl: './user-dashboard-profile-edit.component.html',
  styleUrls: ['./user-dashboard-profile-edit.component.css']
})
export class UserDashboardProfileEditComponent implements OnInit {
  userInformation:UserInformationDto;
  dto:UserUpdateProfileDto;
  email:string;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  proffesions:Profession[];
  cities:City[];
  image:any;
  photo:File;
  location:Location;
  loading:boolean;
  
  constructor(private dataService:DataService, private userService:UserService,
    private cityService: CityService, private professionService: ProfessionService,
    private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.image="../../assets/profile.svg";
    this.loading=true;
    this.location= new Location();
    this.userInformation= new UserInformationDto();
    this.image="../../assets/profile.svg";
    this.dataService.currentMessage.subscribe(emailUser =>{
      if(emailUser==="default message"){
        this.dataService.changeMessage(localStorage.getItem('email_user'));
        this.email=localStorage.getItem('email_user');
        this.userService.getUser(localStorage.getItem('email_user')).subscribe((userInformation:UserInformationDto)=>{
          this.userInformation=userInformation;
          this.image= this.userInformation.photo;
          this.location=userInformation.locations.pop();
          console.log(this.location)
          this.cityService.getAllCities().subscribe(allCities=>
            {
              this.cities=allCities;
              this.location.city=allCities.find(city=>city.name===this.location.city.name);
            });
          this.loading=false;
        })
      }
      else{
      this.userService.getUser(emailUser).subscribe((userInformation:UserInformationDto)=>{
        this.email=localStorage.getItem('email_user');
        this.userInformation=userInformation;
        this.image= this.userInformation.photo;
        this.location=userInformation.locations.pop();
        console.log(this.location)
        this.cityService.getAllCities().subscribe(allCities=>
          {
            this.cities=allCities;
            this.location.city=allCities.find(city=>city.name===this.location.city.name);
          });
        this.loading=false;
      })
    }
    });
    
  }

  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  onSubmit(){
    this.loading=true;
    this.dto= new UserUpdateProfileDto();
    this.dto.id=this.userInformation.id;
    this.dto.accountEmail=this.email;
    this.dto.accountName=this.userInformation.accountName;
    this.dto.accountLastname=this.userInformation.accountLastname;
    this.dto.identificationNumber=this.userInformation.identificationNumber;
    this.dto.phone=this.userInformation.phone;
    let locationsTmp:Array<Location>= new Array<Location>();
    locationsTmp.push(this.location);
    this.dto.locations= locationsTmp;
    this.userService.updateUser(this.dto)
    .subscribe(httpCode => {
      this.loading = false;
      this.router.navigate(['dashboard_usuario/perfil'])
     },
     error=> {
      this.loading = false;
       });
    }
    
  savechanges(){
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
  
  cancel(){
    this.router.navigateByUrl('/dashboard_usuario/perfil');
  }
}
