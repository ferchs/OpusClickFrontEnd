import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { ProviderGetProfileDto } from "../_dtos/providerGetProfileDto";
import { DataService } from "../_services/data.service";
import { DataProviderService } from "../_services/data-provider.service";
import { ProviderService } from "../_services/provider.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-dashboard-profile',
  templateUrl: './provider-dashboard-profile.component.html',
  styleUrls: ['./provider-dashboard-profile.component.css']
})
export class ProviderDashboardProfileComponent implements OnInit {

  provider:ProviderGetProfileDto;
  photo:File;
  image:any;
  imageToShow: any;
  loading:boolean;

  constructor(private dataService:DataService, private dataProviderService:DataProviderService, 
    private providerService:ProviderService,private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading=true;
    this.provider= new ProviderGetProfileDto();
    this.image="../../assets/profile.svg";
    this.providerService.getProvider(localStorage.getItem("id_provider")).subscribe((provider:ProviderGetProfileDto)=>{
      this.provider=provider;
        if(provider.photo!=undefined || provider.photo==null || provider.photo.length<1){
          this.image=provider.photo;
        }
        this.loading=false;
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
    this.providerService.setProviderPhoto(image,this.provider.id)
        .subscribe((url:string)=>{
          this.image=url;
          this.provider.photo=url;
          this.dataProviderService.changeMessage(this.provider);
          this.loading=false;
        });
    }
  }
  
  editInformation(){
    this.router.navigateByUrl('/dashboard_experto/perfil/editar');
  }

}
