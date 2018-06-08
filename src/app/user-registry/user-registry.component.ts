import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { CityService } from '../_services/city.service';
import { Account } from '../_models/account';
import { User } from '../_models/user';
import { City } from '../_models/city';
import { Location } from '../_models/location';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserRegistrationDto } from "../_dtos/userRegistrationDto";

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})

export class UserRegistryComponent implements OnInit {

  dto:UserRegistrationDto;
  cities:City[];
  mCity:City;  
  registeredEmailError:boolean;
  loading:boolean;
  public loggedIn:boolean;

  
  ngOnInit() {
    this.dto= new UserRegistrationDto();
    this.loggedIn=this.authService.isLoggedIn();
    this.cities=null;
    this.mCity=null;
    this.cityService.getAllCities().subscribe(allCities=>this.cities=allCities);
    this.registeredEmailError=false;
    this.loading=false; 
  }
  
  constructor(private authService: AuthService, private accountService: AccountService, private cityService: CityService,
    private router: Router) {}

  onSubmit(){
    this.loading = true;
    let location= new Location();
    location.city=this.mCity;
    this.dto.userLocations=new Array<Location>(0);
    this.dto.userLocations.push(location);
    console.log(this.dto);
    this.accountService.createUserAccount(this.dto)
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
