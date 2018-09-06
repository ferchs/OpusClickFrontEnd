import { Component, OnInit } from '@angular/core';
import { DataService } from "../_services/data.service";
import { DataProviderService } from "../_services/data-provider.service";
import { ProviderService } from "../_services/provider.service";
import { ProviderGetProfileDto } from "../_dtos/providerGetProfileDto";

@Component({
  selector: 'app-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {

  provider:ProviderGetProfileDto;

  constructor(private dataService:DataService, private providerService:ProviderService,
    private dataProviderService:DataProviderService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(idProvider =>{
      if(idProvider==="default message"){
        this.dataService.changeMessage(localStorage.getItem('id_provider'));
        this.providerService.getProvider(localStorage.getItem('id_provider')).subscribe((provider:ProviderGetProfileDto)=>{
          this.dataProviderService.changeMessage(provider);
        })
      }
      else{
        if(localStorage.getItem('id_provider')!=null){
          this.providerService.getProvider(localStorage.getItem('id_provider')).subscribe((provider:ProviderGetProfileDto)=>{
            this.dataProviderService.changeMessage(provider);
          })
        }
    }
    });
  }

}
