import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModuleRoutingModule } from './navbar-module-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarModuleRoutingModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModuleModule { }
