import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { Provider } from "../_models/provider";
import { Location } from "../_models/location";
import { DataService } from "../_services/data.service";
import { DataProviderService } from "../_services/data-provider.service";
import { ProviderService } from "../_services/provider.service";
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard-profile',
  templateUrl: './user-dashboard-profile.component.html',
  styleUrls: ['./user-dashboard-profile.component.css']
})
export class UserDashboardProfileComponent implements OnInit {
  photo:File;
  email:string;
  idNumber:string;
  name:string;
  lastname:string;
  address:string;
  cellphone:string;
  profession:string;
  city:string;
  image:any;
  imageToShow: any;
  globalSatisfactionLevel:number;
  loading:boolean;

  constructor(private dataService:DataService, private dataProviderService:DataProviderService, 
    private providerService:ProviderService,private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.image="../../assets/profile.svg";
    this.globalSatisfactionLevel=100;
    this.loading=true;
    this.dataService.currentMessage.subscribe(message =>{
      this.loading=false;
      this.email = message
      this.dataProviderService.currentMessage.subscribe((provider:Provider)=>{
        this.idNumber=provider.identificationNumber;
        this.name=provider.account.name;
        this.lastname=provider.account.lastname;
        this.address=provider.location.address;
        this.cellphone=provider.phone;
        this.image=provider.photo;
        this.profession=provider.profession.name;
        this.city=provider.location.city.name;
        this.globalSatisfactionLevel=provider.globalRating.globalSatisfactionLevel;
      })
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
        this.providerService.setProviderPhoto(this.photo,this.email)
        .subscribe((url:string)=>{
          this.image=url;
          this.loading=false;
        });
      }
    }
  }
  
  editInformation(){
    this.router.navigateByUrl('/dashboard_experto/perfil/editar');
  }

}
