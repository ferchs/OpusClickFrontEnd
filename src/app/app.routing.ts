import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { ProviderRegistryComponent } from './provider-registry/provider-registry.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardProfileComponent } from './user-dashboard-profile/user-dashboard-profile.component';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { UserDashboardProfileEditComponent } from './user-dashboard-profile-edit/user-dashboard-profile-edit.component';
import { UserDashboardVisitPendingComponent } from './user-dashboard-visit-pending/user-dashboard-visit-pending.component';
import { UserDashboardVisitAcceptedComponent } from './user-dashboard-visit-accepted/user-dashboard-visit-accepted.component';
import { UserDashboardNegotiationPendingComponent } from './user-dashboard-negotiation-pending/user-dashboard-negotiation-pending.component';
import { UserDashboardNegotiationConcretedComponent } from './user-dashboard-negotiation-concreted/user-dashboard-negotiation-concreted.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ProviderDashboardHomeComponent } from './provider-dashboard-home/provider-dashboard-home.component';
import { ProviderDashboardProfileComponent } from './provider-dashboard-profile/provider-dashboard-profile.component';
import { ProviderDashboardProfileEditComponent } from './provider-dashboard-profile-edit/provider-dashboard-profile-edit.component';
import { ProviderDashboardVisitPendingComponent } from './provider-dashboard-visit-pending/provider-dashboard-visit-pending.component';
import { ProviderDashboardVisitAcceptedComponent } from './provider-dashboard-visit-accepted/provider-dashboard-visit-accepted.component';
import { ProviderDashboardNegotiationPendingComponent } from './provider-dashboard-negotiation-pending/provider-dashboard-negotiation-pending.component';
import { ProviderDashboardNegotiationConcretedComponent } from './provider-dashboard-negotiation-concreted/provider-dashboard-negotiation-concreted.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { RequestVisitComponent } from './request-visit/request-visit.component';
import { UserOnlineQuoteComponent } from './user-online-quote/user-online-quote.component';
import { UserDashboardVisitUnfulfilledComponent } from './user-dashboard-visit-unfulfilled/user-dashboard-visit-unfulfilled.component';
import { ProviderDashboardVisitUnfulfilledComponent } from './provider-dashboard-visit-unfulfilled/provider-dashboard-visit-unfulfilled.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    {path:'', component: HomeComponent},
    {path:'quiero_contratar', component: UserRegistryComponent},
    {path:'expertos', component: ProviderListComponent},      
    {path:'soy_experto', component: ProviderRegistryComponent},
    {path:'olvide_contraseña', component: ForgetPasswordComponent},
    {path:'cuenta_creada', component: AccountCreatedComponent},   
    {path:'reestablecer_contraseña', component: ResetPasswordComponent},   
    {path:'entrar', component: LoginComponent},
    {path:'confirmar_registro', component: ConfirmRegistrationComponent},
    {path:'dashboard_usuario', component: UserDashboardComponent,
        children: [
            { path: '', component: UserDashboardHomeComponent },
            { path: 'perfil', component:  UserDashboardProfileComponent},
            { path: 'perfil/editar', component: UserDashboardProfileEditComponent},
            { path: 'visitas/pendientes', component: UserDashboardVisitPendingComponent},
            { path: 'visitas/aceptadas', component: UserDashboardVisitAcceptedComponent},
            { path: 'visitas/incumplidas', component: UserDashboardVisitUnfulfilledComponent},
            { path: 'negociaciones/en_progreso', component: UserDashboardNegotiationPendingComponent},
            { path: 'negociaciones/concretadas', component: UserDashboardNegotiationConcretedComponent}
        ], canActivate: [AuthGuard]
    },
    {path:'dashboard_experto', component: ProviderDashboardComponent,
        children: [
            { path: '', component: ProviderDashboardHomeComponent },
            { path: 'perfil', component:  ProviderDashboardProfileComponent},
            { path: 'perfil/editar', component: ProviderDashboardProfileEditComponent},
            { path: 'visitas/nuevas', component: ProviderDashboardVisitPendingComponent},
            { path: 'visitas/aceptadas', component: ProviderDashboardVisitAcceptedComponent},
            { path: 'visitas/incumplidas', component: ProviderDashboardVisitUnfulfilledComponent},
            { path: 'negociaciones/en_progreso', component: ProviderDashboardNegotiationPendingComponent},
            { path: 'negociaciones/concretadas', component: ProviderDashboardNegotiationConcretedComponent}
        ], canActivate: [AuthGuard]
    },
    {path:'expertos', component: ProviderListComponent},
    {path:'visitas', component: RequestVisitComponent, canActivate: [AuthGuard]},
    {path:'cotizacion_virtual', component: UserOnlineQuoteComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);