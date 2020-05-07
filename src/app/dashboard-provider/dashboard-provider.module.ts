import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardProviderRoutingModule } from './dashboard-provider-routing.module';
import { ProviderDashboardHomeComponent } from './provider-dashboard-home/provider-dashboard-home.component';
import { ProviderDashboardProfileComponent } from './provider-dashboard-profile/provider-dashboard-profile.component';
import { ProviderDashboardProfileEditComponent } from './provider-dashboard-profile-edit/provider-dashboard-profile-edit.component';
import { ProviderDashboardVisitPendingComponent } from './provider-dashboard-visit-pending/provider-dashboard-visit-pending.component';
import { ProviderDashboardVisitAcceptedComponent } from './provider-dashboard-visit-accepted/provider-dashboard-visit-accepted.component';
import { ProviderDashboardVisitUnfulfilledComponent } from './provider-dashboard-visit-unfulfilled/provider-dashboard-visit-unfulfilled.component';
import { ProviderDashboardNegotiationPendingComponent } from './provider-dashboard-negotiation-pending/provider-dashboard-negotiation-pending.component';
import { ProviderDashboardNegotiationConcretedComponent } from './provider-dashboard-negotiation-concreted/provider-dashboard-negotiation-concreted.component';
import { ProviderDashboardNegotiationFinishedComponent } from './provider-dashboard-negotiation-finished/provider-dashboard-negotiation-finished.component';
import { NavbarModuleModule } from '../navbar-module/navbar-module.module';
import { SharedModule } from '../shared/shared.module';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ProviderDashboardMenuComponent } from './provider-dashboard-menu/provider-dashboard-menu.component';
import { ProviderDashboardNegotiationComponent } from './provider-dashboard-negotiation/provider-dashboard-negotiation.component';
import { ProviderDashboardVisitComponent } from './provider-dashboard-visit/provider-dashboard-visit.component';
import { ProviderDashboardRatingsComponent } from './provider-dashboard-ratings/provider-dashboard-ratings.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardProviderRoutingModule,
    NavbarModuleModule,
    SharedModule
  ],
  declarations: [
    ProviderDashboardComponent,
    ProviderDashboardMenuComponent,
    ProviderDashboardHomeComponent,
    ProviderDashboardVisitComponent,
    ProviderDashboardProfileComponent,
    ProviderDashboardRatingsComponent,
    ProviderDashboardNegotiationComponent,
    ProviderDashboardProfileEditComponent,
    ProviderDashboardVisitPendingComponent,
    ProviderDashboardVisitAcceptedComponent,
    ProviderDashboardVisitUnfulfilledComponent,
    ProviderDashboardNegotiationPendingComponent,
    ProviderDashboardNegotiationConcretedComponent,
    ProviderDashboardNegotiationFinishedComponent
  ]
})
export class DashboardProviderModule { }
