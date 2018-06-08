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
import { ProviderUpdateProfileDto } from "../_dtos/providerUpdateDto";

@Component({
  selector: 'app-provider-dashboard-profile-edit',
  templateUrl: './provider-dashboard-profile-edit.component.html',
  styleUrls: ['./provider-dashboard-profile-edit.component.css']
})
export class ProviderDashboardProfileEditComponent implements OnInit {

  provider:Provider;
  dto:ProviderUpdateProfileDto;
  email:string;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  proffesions:Profession[];
  cities:City[];
  image:any;
  photo:File;
  loading:boolean;
  
  constructor(private router: Router, private dataProviderService:DataProviderService, 
    private cityService: CityService, private professionService: ProfessionService,
    private providerService:ProviderService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.image="../../assets/profile.svg";
    this.dataProviderService.currentMessage.subscribe((provider:Provider)=>{
    this.provider=provider;
    this.email=provider.account.email;
    this.image=provider.photo;
    this.cityService.getAllCities().subscribe(allCities=>
      {
        this.cities=allCities;
        provider.location.city=allCities.find(city=>city.name===provider.location.city.name);
      });
    this.professionService.getAllProfessions().subscribe(allProfessions=>
      {
      this.proffesions=allProfessions;
      provider.profession=allProfessions.find(profession=>profession.name===provider.profession.name);
      });
    this.loading=false;
    })
  }

  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

  onSubmit(){
    this.loading=true;
    this.dto= new ProviderUpdateProfileDto();
    this.dto.id=this.provider.id;
    this.dto.email=this.email;
    this.dto.accountName=this.provider.account.name;
    this.dto.accountLastname=this.provider.account.lastname;
    this.dto.identificationNumber=this.provider.identificationNumber;
    this.dto.phone=this.provider.phone;
    this.dto.profession=this.provider.profession;
    this.dto.location= this.provider.location;
    this.providerService.updateProvider(this.dto)
    .subscribe(httpCode => {
      this.loading = false;
      this.dataProviderService.changeMessage(this.provider);
      this.router.navigate(['dashboard_experto/perfil'])
     },
     error=> {
      this.loading = false;
       });
    }
    
  savechanges(){
  }

  cancel(){
    this.router.navigateByUrl('/dashboard_experto/perfil');

  }

}
