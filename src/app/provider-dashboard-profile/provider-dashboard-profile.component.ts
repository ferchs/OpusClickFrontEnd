import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { Provider } from "../_models/provider";
import { Location } from "../_models/location";
import { DataService } from "../_services/data.service";
import { DataProviderService } from "../_services/data-provider.service";
import { ProviderService } from "../_services/provider.service";
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-provider-dashboard-profile',
  templateUrl: './provider-dashboard-profile.component.html',
  styleUrls: ['./provider-dashboard-profile.component.css']
})
export class ProviderDashboardProfileComponent implements OnInit {

  provider:Provider;
  photo:File;
  email:string;
  image:any;
  imageToShow: any;
  loading:boolean;

  constructor(private dataService:DataService, private dataProviderService:DataProviderService, 
    private providerService:ProviderService,private router: Router, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading=true;
    this.image="../../assets/profile.svg";
    this.dataService.currentMessage.subscribe(message =>{
      this.loading=false;
      this.email = message
      this.dataProviderService.currentMessage.subscribe((provider:Provider)=>{
        this.provider=provider;
        console.log(provider);
        if(provider.photo!=undefined){
          this.image=provider.photo;
        }
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
          this.provider.photo=url;
          this.dataProviderService.changeMessage(this.provider);
          this.loading=false;
        });
      }
    }
  }
  
  editInformation(){
    this.router.navigateByUrl('/dashboard_experto/perfil/editar');
  }

}
