import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { UserDashboardProfileComponent } from './user-dashboard-profile/user-dashboard-profile.component';
import { UserDashboardProfileEditComponent } from './user-dashboard-profile-edit/user-dashboard-profile-edit.component';
import { UserDashboardVisitPendingComponent } from './user-dashboard-visit-pending/user-dashboard-visit-pending.component';
import { UserDashboardVisitAcceptedComponent } from './user-dashboard-visit-accepted/user-dashboard-visit-accepted.component';
import { UserDashboardVisitUnfulfilledComponent } from './user-dashboard-visit-unfulfilled/user-dashboard-visit-unfulfilled.component';
import { UserDashboardNegotiationPendingComponent } from './user-dashboard-negotiation-pending/user-dashboard-negotiation-pending.component';
import { UserDashboardNegotiationConcretedComponent } from './user-dashboard-negotiation-concreted/user-dashboard-negotiation-concreted.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  { path: '', component: UserDashboardComponent,
  canActivateChild: [AuthGuard],
      children: [
          { path: 'cuenta', component: UserDashboardHomeComponent},
          { path: 'perfil', component:  UserDashboardProfileComponent},
          { path: 'perfil/editar', component: UserDashboardProfileEditComponent},
          { path: 'visitas/pendientes', component: UserDashboardVisitPendingComponent},
          { path: 'visitas/aceptadas', component: UserDashboardVisitAcceptedComponent},
          { path: 'visitas/incumplidas', component: UserDashboardVisitUnfulfilledComponent},
          { path: 'negociaciones/en_proceso', component: UserDashboardNegotiationPendingComponent},
          { path: 'negociaciones/concretadas', component: UserDashboardNegotiationConcretedComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardUserRoutingModule { }
