import { Component, OnInit } from '@angular/core';
import { ProfessionService } from '../_services/profession.service';
import { SearchService } from '../_services/search.service';
import { Profession } from '../_models/profession';
import { Search } from '../_models/search';
import { AuthService } from '../_services/auth.service';
import { Router} from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-dashboard-home',
  templateUrl: './user-dashboard-home.component.html',
  styleUrls: ['./user-dashboard-home.component.css']
})
export class UserDashboardHomeComponent implements OnInit {

  professions:Profession[];
  profession:Profession;
  placeholder:string;
  mSearch:string;
  showDropDown:boolean;
  supportPhone:string;

  constructor(private professionService: ProfessionService, private searchService: SearchService,
    private authService: AuthService, private router: Router) { }

    ngOnInit() {
      let profession= new Profession();
      profession.setId(0);
      profession.setName("Otra...");
      this.professionService.getAllProfessions().subscribe(allProfessions=>{
        allProfessions.push(profession);
        this.professions=allProfessions
      });
      this.profession=new Profession();
      this.mSearch="";
      this.placeholder="¿Qué servicio necesitas?";
      this.showDropDown=false;
      this.supportPhone=environment.supportPhone;
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
        this.profession.id=value.professionId;
        this.profession.name=value.name;
        this.profession.formId=value.formId;
      }
      this.showDropDown = false;
    }
  
  
    find(){
      if(this.profession.id===0){
        let search= new Search(this.mSearch);
        this.searchService.saveAnother(search);
      }
      else{
        this.router.navigate(['expertos'],{ queryParams: { profession: this.profession.id } })
      }
    }
}
