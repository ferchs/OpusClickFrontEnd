import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoAlbanilesComponent } from './info-albaniles/info-albaniles.component';
import { InfoCarpinterosComponent } from './info-carpinteros/info-carpinteros.component';
import { InfoPlomerosComponent } from './info-plomeros/info-plomeros.component';
import { InfoPintoresComponent } from './info-pintores/info-pintores.component';
import { InfoTapicerosComponent } from './info-tapiceros/info-tapiceros.component';
import { InfoElectricistasComponent } from './info-electricistas/info-electricistas.component';
import { InfoSoldadoresComponent } from './info-soldadores/info-soldadores.component';

const routes: Routes = [
  {path:'albañil', component: InfoAlbanilesComponent},
  {path:'carpintero', component: InfoCarpinterosComponent},
  {path:'plomero', component: InfoPlomerosComponent},
  {path:'pintor', component: InfoPintoresComponent},
  {path:'tapicero', component: InfoTapicerosComponent},
  {path:'electricista', component: InfoElectricistasComponent},
  {path:'cerrajero', component: InfoSoldadoresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationPagesRoutingModule { }
