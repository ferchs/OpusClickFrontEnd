import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProviderDashboardHomeComponent } from './provider-dashboard-home/provider-dashboard-home.component';
import { ProviderDashboardProfileComponent } from './provider-dashboard-profile/provider-dashboard-profile.component';
import { ProviderDashboardProfileEditComponent } from './provider-dashboard-profile-edit/provider-dashboard-profile-edit.component';
import { ProviderDashboardVisitPendingComponent } from './provider-dashboard-visit-pending/provider-dashboard-visit-pending.component';
import { ProviderDashboardVisitAcceptedComponent } from './provider-dashboard-visit-accepted/provider-dashboard-visit-accepted.component';
import { ProviderDashboardVisitUnfulfilledComponent } from './provider-dashboard-visit-unfulfilled/provider-dashboard-visit-unfulfilled.component';
import { ProviderDashboardNegotiationPendingComponent } from './provider-dashboard-negotiation-pending/provider-dashboard-negotiation-pending.component';
import { ProviderDashboardNegotiationConcretedComponent } from './provider-dashboard-negotiation-concreted/provider-dashboard-negotiation-concreted.component';
import { ProviderDashboardNegotiationFinishedComponent } from './provider-dashboard-negotiation-finished/provider-dashboard-negotiation-finished.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  { path: '', component: ProviderDashboardComponent,
  canActivateChild: [AuthGuard],
      children: [
        { path: 'cuenta', component: ProviderDashboardHomeComponent },
        { path: 'perfil', component:  ProviderDashboardProfileComponent},
        { path: 'perfil/editar', component: ProviderDashboardProfileEditComponent},
        { path: 'visitas/nuevas', component: ProviderDashboardVisitPendingComponent},
        { path: 'visitas/aceptadas', component: ProviderDashboardVisitAcceptedComponent},
        { path: 'visitas/incumplidas', component: ProviderDashboardVisitUnfulfilledComponent},
        { path: 'negociaciones/en_proceso', component: ProviderDashboardNegotiationPendingComponent},
        { path: 'negociaciones/concretadas', component: ProviderDashboardNegotiationConcretedComponent},
        { path: 'negociaciones/finalizadas', component: ProviderDashboardNegotiationFinishedComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardProviderRoutingModule { }
