import { NgModule } from '@angular/core';
import { DashboardUserRoutingModule } from './dashboard-user-routing.module';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { UserDashboardProfileComponent } from './user-dashboard-profile/user-dashboard-profile.component';
import { UserDashboardProfileEditComponent } from './user-dashboard-profile-edit/user-dashboard-profile-edit.component';
import { UserDashboardVisitPendingComponent } from './user-dashboard-visit-pending/user-dashboard-visit-pending.component';
import { UserDashboardVisitAcceptedComponent } from './user-dashboard-visit-accepted/user-dashboard-visit-accepted.component';
import { UserDashboardVisitUnfulfilledComponent } from './user-dashboard-visit-unfulfilled/user-dashboard-visit-unfulfilled.component';
import { UserDashboardNegotiationPendingComponent } from './user-dashboard-negotiation-pending/user-dashboard-negotiation-pending.component';
import { UserDashboardNegotiationConcretedComponent } from './user-dashboard-negotiation-concreted/user-dashboard-negotiation-concreted.component';
import { NavbarModuleModule } from '../navbar-module/navbar-module.module';
import { SharedModule } from '../shared/shared.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardMenuComponent } from './user-dashboard-menu/user-dashboard-menu.component';
import { UserDashboardNegotiationComponent } from './user-dashboard-negotiation/user-dashboard-negotiation.component';
import { UserDashboardNegotiationFinishedComponent } from './user-dashboard-negotiation-finished/user-dashboard-negotiation-finished.component';
import { UserDashboardQuotationComponent } from './user-dashboard-quotation/user-dashboard-quotation.component';
import { UserDashboardVisitComponent } from './user-dashboard-visit/user-dashboard-visit.component';

@NgModule({
  imports: [
    DashboardUserRoutingModule,
    NavbarModuleModule,
    SharedModule
  ],
  declarations: [
    UserDashboardComponent,
    UserDashboardMenuComponent,
    UserDashboardHomeComponent,
    UserDashboardProfileComponent,
    UserDashboardVisitComponent,
    UserDashboardQuotationComponent,
    UserDashboardProfileEditComponent,
    UserDashboardVisitPendingComponent,
    UserDashboardVisitAcceptedComponent,
    UserDashboardVisitUnfulfilledComponent,
    UserDashboardNegotiationComponent,
    UserDashboardNegotiationPendingComponent,
    UserDashboardNegotiationFinishedComponent,
    UserDashboardNegotiationConcretedComponent
  ]
})
export class DashboardUserModule { }
