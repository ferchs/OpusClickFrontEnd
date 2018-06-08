import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';
import { DataProviderService } from "../_services/data-provider.service";
import { ProviderService } from '../_services/provider.service';
import { ProfessionService } from '../_services/profession.service';
import { CityService } from '../_services/city.service';
import { Provider } from '../_models/provider';
import { City } from '../_models/city';
import { Location } from '../_models/location';
import { Profession } from '../_models/profession';
//import { UpdateProviderProfileDto } from "../_dtos/updateProviderProfileDto";

@Component({
  selector: 'app-user-dashboard-profile-edit',
  templateUrl: './user-dashboard-profile-edit.component.html',
  styleUrls: ['./user-dashboard-profile-edit.component.css']
})
export class UserDashboardProfileEditComponent implements OnInit {

  provider:Provider;
  //dto:UpdateProviderProfileDto;
  email:string;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mIdentification:string;
  mName:string;
  mLastname:string;
  mCellphone:string;
  mAddress:string;
  proffesions:Profession[];
  mProfession:Profession;
  cities:City[];
  mCity:City;
  image:any;
  photo:File;
  globalSatisfactionLevel:number;
  loading:boolean;
  
  constructor(private router: Router, private dataProviderService:DataProviderService, 
    private cityService: CityService, private professionService: ProfessionService,
    private providerService:ProviderService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.image="../../assets/profile.svg";
    this.globalSatisfactionLevel=100;
    this.mProfession= new Profession();
    this.mCity= new City();
    this.dataProviderService.currentMessage.subscribe((provider:Provider)=>{
    this.provider=provider;
    this.email=provider.account.email;
    this.mName=provider.account.name;
    this.mLastname=provider.account.lastname;
    this.mCellphone=provider.phone;
    this.mAddress=provider.location.address;
    this.image=provider.photo;
    this.globalSatisfactionLevel=provider.globalRating.globalSatisfactionLevel;
    this.mCity=provider.location.city;
    this.cityService.getAllCities().subscribe(allCities=>
      {
        this.cities=allCities;
        this.mCity=allCities.find(city=>city.name===provider.location.city.name);
      });
    this.professionService.getAllProfessions().subscribe(allProfessions=>
      {
      this.proffesions=allProfessions;
      this.mProfession=allProfessions.find(profession=>profession.name===provider.profession.name);
      });
    this.loading=false;
    })
  }

  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  onSubmit(){
    /*
    this.loading=true;
    this.dto= new UpdateProviderProfileDto();
    this.dto.providerId=this.email;
    this.dto.accountName=this.mName;
    this.dto.accountLastname=this.mLastname;
    this.dto.identificationNumber=this.mIdentification;
    this.dto.phone=this.mCellphone;
    this.dto.profession=this.mProfession;
    this.provider.location.city=this.mCity;
    this.provider.location.address=this.mAddress;
    this.dto.location= this.provider.location;
    this.providerService.updateProvider(this.dto)
    .subscribe(httpCode => {
      this.loading = false;
      this.router.navigate(['dashboard_experto/perfil'])
     },
     error=> {
      this.loading = false;
       });

       */
    }
    
  savechanges(){
  }

  cancel(){
    this.router.navigateByUrl('/dashboard_experto/perfil');
  }

}
