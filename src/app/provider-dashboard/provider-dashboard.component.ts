import { Component, OnInit } from '@angular/core';
import { DataService } from "../_services/data.service";
import { DataProviderService } from "../_services/data-provider.service";
import { ProviderService } from "../_services/provider.service";
import { Provider } from "../_models/provider";

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {

  provider:Provider;

  constructor(private dataService:DataService, private providerService:ProviderService,
    private dataProviderService:DataProviderService) { }

  ngOnInit() {
    console.log("Se llama OnInit Provider Dash Component")
    this.dataService.currentMessage.subscribe(idProvider =>{
      if(idProvider==="default message"){
        this.dataService.changeMessage(localStorage.getItem('email_provider'));
        this.providerService.getProvider(localStorage.getItem('email_provider')).subscribe((provider:Provider)=>{
          this.dataProviderService.changeMessage(provider);
        })
      }
      else{
      this.providerService.getProvider(idProvider).subscribe((provider:Provider)=>{
        this.dataProviderService.changeMessage(provider);
      })
    }
    });
  }

}
