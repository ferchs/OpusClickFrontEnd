import { Component, OnInit } from '@angular/core';
import { ProfessionService } from '../_services/profession.service';
import { SearchService } from '../_services/search.service';
import { Profession } from '../_models/profession';
import { Search } from '../_models/search';
import { AuthService } from '../_services/auth.service';
import { Router} from '@angular/router';

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
    }
  
    toggleDropDown() {
      this.showDropDown = !this.showDropDown;
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
        this.router.navigate(['expertos'],{ queryParams: { profession: this.mSearch } })
      }
    }
}
