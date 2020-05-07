import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';
import { DataProviderService } from "../../_services/data-provider.service";
import { ProviderService } from '../../_services/provider.service';
import { ProfessionService } from '../../_services/profession.service';
import { CityService } from '../../_services/city.service';
import { ProviderGetProfileDto } from "../../_dtos/providerGetProfileDto";
import { City } from '../../_models/city';
import { Location } from '../../_models/location';
import { Profession } from '../../_models/profession';
import { ProviderUpdateProfileDto } from "../../_dtos/providerUpdateDto";

@Component({
  selector: 'app-provider-dashboard-profile-edit',
  templateUrl: './provider-dashboard-profile-edit.component.html',
  styleUrls: ['./provider-dashboard-profile-edit.component.css']
})
export class ProviderDashboardProfileEditComponent implements OnInit {

  provider:ProviderGetProfileDto;
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
    this.providerService.getProvider(localStorage.getItem("id_provider")).subscribe((provider:ProviderGetProfileDto)=>{
      this.provider=provider;
    this.email=provider.accountEmail;
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
    });
    
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
    this.dto.accountName=this.provider.accountName;
    this.dto.accountLastname=this.provider.accountLastname;
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
    this.router.navigateByUrl('/dashboard_experto/perfil');

  }

}
