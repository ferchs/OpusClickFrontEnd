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
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.photo = event.target.files[0];
      reader.readAsDataURL(this.photo);
      reader.onload = (event: any) => {
        this.image=event.target.result;
        this.userService.setUserPhoto(this.photo,this.email)
        .subscribe((url:string)=>{
          this.image=url;
          this.loading=false;
        });
      }
    }
  }
  
  cancel(){
    this.router.navigateByUrl('/dashboard_usuario/perfil');
  }
}
