import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ProfessionService } from '../_services/profession.service';
import { CityService } from '../_services/city.service';
import { Provider } from '../_models/provider';
import { City } from '../_models/city';
import { Location } from '../_models/location';
import { Profession } from '../_models/profession';
import { Account } from '../_models/account';
import { Router } from '@angular/router';
import { GlobalRating } from '../_models/global-rating';
import { AuthService } from '../_services/auth.service';
import { ProviderRegistrationDto } from "../_dtos/providerRegistrationDto";


@Component({
  selector: 'app-provider-registry',
  templateUrl: './provider-registry.component.html',
  styleUrls: ['./provider-registry.component.css']
})
export class ProviderRegistryComponent implements OnInit {
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  dto:ProviderRegistrationDto;
  proffesions:Profession[];
  mProffesion:Profession;   
  cities:City[];
  mCity:City;
  registeredEmailError:boolean;
  loading:boolean;
  public loggedIn:boolean;

  
  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
    this.dto= new ProviderRegistrationDto();
    this.cities=null;
    this.mCity=null;
    this.proffesions=null;
    this.mProffesion=null;
    this.cityService.getAllCities().subscribe(allCities=>this.cities=allCities);
    this.professionService.getAllProfessions().subscribe(allProfessions=>this.proffesions=allProfessions);
    this.registeredEmailError=false;
    this.loading=false;
  }

  constructor(private authService: AuthService, private accountService: AccountService, private cityService: CityService,
    private professionService: ProfessionService, private router: Router) {}

  onSubmit(){
    this.loading = true;
    this.dto.profession=this.mProffesion;
    this.dto.city=this.mCity;
    console.log(this.dto);
    this.accountService.createProviderAccount(this.dto)
    .subscribe(httpCode => {
      this.loading = false;
      this.router.navigate(['cuenta_creada'])
     },
     error=> {
      this.loading = false;
       if(error===409){
        this.registeredEmailError=true;
       }
     });
    }

    valuechange(newValue) {
      if(this.registeredEmailError===true){
        this.registeredEmailError=false;
      }
    }
}
