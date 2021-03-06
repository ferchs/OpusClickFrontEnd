import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ProviderService } from "../_services/provider.service";
import { ProfessionService } from '../_services/profession.service';
import { SearchService } from '../_services/search.service';
import { ProviderByProfessionDto} from "../_dtos/providerByProfession";
import { Profession } from '../_models/profession';
import { Search } from '../_models/search';
import { AuthService } from '../_services/auth.service';
import {DomSanitizer} from '@angular/platform-browser'
import { UserService } from '../_services/user.service';
import { UserInformationDto } from '../_dtos/userInformationDto';
import { User } from '../_models/user';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {

  professions:Profession[];
  profession:Profession;
  providers:Array<ProviderByProfessionDto>;
  placeholder:string;
  mSearch:string;
  showDropDown:boolean;
  userId:number;
  formId:string;
  loading:boolean;
  loggedIn:boolean;
  providersFound:boolean;
  canHire:boolean;

  constructor(private providerService: ProviderService, 
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private professionService: ProfessionService, 
    private searchService: SearchService, 
    private authService: AuthService, 
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loggedIn=this.authService.isLoggedIn();
    this.canHire=true;
    this.loading=true;
    this.userId=+localStorage.getItem("id_user");
    this.providers= new Array<ProviderByProfessionDto>();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.providerService.getProvidersByProfession(params['profession']).subscribe(result=>{
        this.providers=result;
        if(this.providers.length >= 1){
          this.mSearch= this.providers[0].professionName;
          this.providersFound=true;
        }else{
          this.providersFound=false;
        }
        this.loading=false;
      });
    });
    let profession= new Profession();
    profession.setId(0);
    profession.setName("Otra...");
    this.professionService.getAllProfessions().subscribe(allProfessions=>{
      allProfessions.push(profession);
      this.professions=allProfessions
    });
    this.profession=new Profession();
    this.placeholder="¿Qué servicio necesitas?";
    this.showDropDown=false;
    /*
    Esto que está comentado es para determinar si un usuario puede contratar, ya que como inicialmente
    se planteó no se puede contratar si un usuario no tiene toda su información completa, es decir 
    numero de telefono y dirección
    this.userService.getUser(localStorage.getItem("email_user")).subscribe((userInfo:UserInformationDto)=>{
      if(userInfo.state!="READY"){
        this.canHire=false;
      }
    });*/
  }

  openDropDown() {
    this.showDropDown = true;
  }
  closeDropDown(){
    this.showDropDown = false;
  }

  getSearchValue() {
    return this.mSearch;
  }

  selectValue(value) {
    if(value.name==='Otra...'){
      this.mSearch="";
      this.profession=value;
      this.placeholder="Ingresa el nombre de la especialidad que requieres";
    }
    else{
      this.placeholder="¿Qué servicio necesitas?";
      this.mSearch=value.name;
      this.profession=value;
    }
    this.showDropDown = false;
  }

  find(){
    if(this.profession.id===0){
      let search= new Search(this.mSearch);
      this.searchService.saveAnother(search);
    }
    else{
      this.loading=true;
      this.router.navigate(['expertos'],{ queryParams: { profession: this.mSearch } })
      this.loading=false;
    }
  }

  makeTrustedImage(item) {
    const style = 'url(' + item + ')';
    return this.domSanitizer.bypassSecurityTrustStyle(style);
  }

}
