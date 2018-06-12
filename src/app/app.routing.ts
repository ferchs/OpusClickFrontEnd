import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { UserService } from './_services/user.service';
import { ProviderRegistryComponent } from './provider-registry/provider-registry.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserDashboardProfileComponent } from './user-dashboard-profile/user-dashboard-profile.component';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { UserDashboardProfileEditComponent } from './user-dashboard-profile-edit/user-dashboard-profile-edit.component';

import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ProviderDashboardHomeComponent } from './provider-dashboard-home/provider-dashboard-home.component';
import { ProviderDashboardProfileComponent } from './provider-dashboard-profile/provider-dashboard-profile.component';
import { ProviderDashboardProfileEditComponent } from './provider-dashboard-profile-edit/provider-dashboard-profile-edit.component';
import { ProviderDashboardRatingsComponent } from './provider-dashboard-ratings/provider-dashboard-ratings.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { RequestVisitComponent } from './request-visit/request-visit.component';
import { OnlineQuoteComponent } from './online-quote/online-quote.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    {path:'', component: HomeComponent},
    {path:'quiero_contratar', component: UserRegistryComponent},
    {path:'expertos', component: ProviderListComponent, canActivate: [AuthGuard]},      
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
            { path: 'perfil/editar', component: UserDashboardProfileEditComponent}
        ]
    },
    {path:'dashboard_experto', component: ProviderDashboardComponent,
        children: [
            { path: '', component: ProviderDashboardHomeComponent },
            { path: 'perfil', component:  ProviderDashboardProfileComponent},
            { path: 'perfil/editar', component: ProviderDashboardProfileEditComponent},
            { path: 'calificaciones', component: ProviderDashboardRatingsComponent }
        ]
    },
    {path:'expertos', component: ProviderListComponent},
    {path:'visitas', component: RequestVisitComponent},
    {path:'cotizacion_virtual', component: OnlineQuoteComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);