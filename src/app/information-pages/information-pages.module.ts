import { NgModule } from '@angular/core';
import { InformationPagesRoutingModule } from './information-pages-routing.module';
import { InfoAlbanilesComponent } from './info-albaniles/info-albaniles.component';
import { InfoCarpinterosComponent } from './info-carpinteros/info-carpinteros.component';
import { InfoPlomerosComponent } from './info-plomeros/info-plomeros.component';
import { InfoPintoresComponent } from './info-pintores/info-pintores.component';
import { InfoTapicerosComponent } from './info-tapiceros/info-tapiceros.component';
import { InfoElectricistasComponent } from './info-electricistas/info-electricistas.component';
import { InfoSoldadoresComponent } from './info-soldadores/info-soldadores.component';
import { NavbarModuleModule } from '../navbar-module/navbar-module.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    InformationPagesRoutingModule,
    NavbarModuleModule,
    SharedModule
  ],
  declarations: [
    InfoAlbanilesComponent,
    InfoCarpinterosComponent,
    InfoPlomerosComponent,
    InfoPintoresComponent,
    InfoTapicerosComponent,
    InfoElectricistasComponent,
    InfoSoldadoresComponent
  ]
})
export class InformationPagesModule { }
