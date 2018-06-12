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
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.photo = event.target.files[0];
      reader.readAsDataURL(this.photo);
      reader.onload = (event: any) => {
        this.image=event.target.result;
        this.userService.setUserPhoto(this.photo,this.email)
        .subscribe((url:string)=>{
          this.image=url;
          this.userDto.photo=url;
          this.loading=false;
        });
      }
    }
  }
  
  editInformation(){
    this.router.navigateByUrl('/dashboard_usuario/perfil/editar');
  }

}
