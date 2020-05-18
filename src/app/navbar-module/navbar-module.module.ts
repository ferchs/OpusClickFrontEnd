import { NgModule } from '@angular/core';
import { NavbarModuleRoutingModule } from './navbar-module-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    NavbarModuleRoutingModule,
    SharedModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModuleModule { }
