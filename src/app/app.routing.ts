import { Routes, RouterModule } from '@angular/router';
import { InjectionToken } from '@angular/core';
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
import { ProviderRequestPaymentComponent } from './provider-request-payment/provider-request-payment.component';
import { ProviderViewCompleteProfileComponent } from './provider-view-complete-profile/provider-view-complete-profile.component';
import { ViewContractComponent } from './view-contract/view-contract.component';
import { ViewSignedContractComponent } from './view-signed-contract/view-signed-contract.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { RequestVisitComponent } from './request-visit/request-visit.component';
import { UserOnlineQuoteComponent } from './user-online-quote/user-online-quote.component';
import { UserDashboardVisitUnfulfilledComponent } from './user-dashboard-visit-unfulfilled/user-dashboard-visit-unfulfilled.component';
import { ProviderDashboardVisitUnfulfilledComponent } from './provider-dashboard-visit-unfulfilled/provider-dashboard-visit-unfulfilled.component';
import { ReviewComponent } from './review/review.component';
import { ProviderQuotationComponent } from './provider-quotation/provider-quotation.component';
import { UserViewQuotationComponent } from './user-view-quotation/user-view-quotation.component';
import { ProviderViewQuotationComponent } from './provider-view-quotation/provider-view-quotation.component';
import { UserManageContractComponent } from './user-manage-contract/user-manage-contract.component';
import { ProviderManageContractComponent } from './provider-manage-contract/provider-manage-contract.component';
import { UserSpecifyContractComponent } from './user-specify-contract/user-specify-contract.component';
import { UserApprovePaymentComponent } from './user-approve-payment/user-approve-payment.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserPaymentSummaryComponent } from './user-payment-summary/user-payment-summary.component';
import { InfoCarpinterosComponent } from './info-carpinteros/info-carpinteros.component';
import { InfoPlomerosComponent } from './info-plomeros/info-plomeros.component';
import { InfoPintoresComponent } from './info-pintores/info-pintores.component';
import { InfoTapicerosComponent } from './info-tapiceros/info-tapiceros.component';
import { InfoElectricistasComponent } from './info-electricistas/info-electricistas.component';
import { InfoSoldadoresComponent } from './info-soldadores/info-soldadores.component';
import { InfoAlbanilesComponent } from './info-albaniles/info-albaniles.component';

const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

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
    {path:'albañil', component: InfoAlbanilesComponent},
    {path:'carpintero', component: InfoCarpinterosComponent},
    {path:'plomero', component: InfoPlomerosComponent},
    {path:'pintor', component: InfoPintoresComponent},
    {path:'tapicero', component: InfoTapicerosComponent},
    {path:'electricista', component: InfoElectricistasComponent},
    {path:'cerrajero', component: InfoSoldadoresComponent},
    {path:'dashboard_usuario', component: UserDashboardComponent,
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
    },
    {path:'dashboard_experto', component: ProviderDashboardComponent,
    canActivateChild: [AuthGuard],
        children: [
            { path: 'cuenta', component: ProviderDashboardHomeComponent },
            { path: 'perfil', component:  ProviderDashboardProfileComponent},
            { path: 'perfil/editar', component: ProviderDashboardProfileEditComponent},
            { path: 'visitas/nuevas', component: ProviderDashboardVisitPendingComponent},
            { path: 'visitas/aceptadas', component: ProviderDashboardVisitAcceptedComponent},
            { path: 'visitas/incumplidas', component: ProviderDashboardVisitUnfulfilledComponent},
            { path: 'negociaciones/en_proceso', component: ProviderDashboardNegotiationPendingComponent},
            { path: 'negociaciones/concretadas', component: ProviderDashboardNegotiationConcretedComponent}
        ]
    },
    {path:'expertos', component: ProviderListComponent},
    {path:'visitas', component: RequestVisitComponent, canActivate: [AuthGuard]},
    {path:'ver_perfil', component: ProviderViewCompleteProfileComponent, canActivate: [AuthGuard]},
    {path:'cotizacion_virtual', component: UserOnlineQuoteComponent, canActivate: [AuthGuard]},
    {path:'cotizar', component: ProviderQuotationComponent, canActivate: [AuthGuard]},
    {path:'ver_propuesta', component: UserViewQuotationComponent, canActivate: [AuthGuard]},
    {path:'ver_cotizacion', component: ProviderViewQuotationComponent, canActivate: [AuthGuard]},
    {path:'definir_contrato', component: UserManageContractComponent, canActivate: [AuthGuard]},
    {path:'concretar_contrato', component: ProviderManageContractComponent, canActivate: [AuthGuard]},
    {path:'redefinir_contrato', component: UserSpecifyContractComponent, canActivate: [AuthGuard]},
    {path:'ver_contrato', component: ViewContractComponent, canActivate: [AuthGuard]},
    {path:'ver_detalles_contrato', component: ViewSignedContractComponent, canActivate: [AuthGuard]},
    {path:'solicitar_pago', component: ProviderRequestPaymentComponent, canActivate: [AuthGuard]},
    {path:'autorizar_pagos', component: UserApprovePaymentComponent, canActivate: [AuthGuard]},
    {path:'calificar', component: ReviewComponent, canActivate: [AuthGuard]},
    {path:'resumen_pago', component: UserPaymentSummaryComponent, canActivate: [AuthGuard]},
    {path: 'externalRedirect',
        resolve: {
            url: externalUrlProvider,
        },
        // We need a component here because we cannot define the route otherwise 
        //Aqui va NotFound component
        component: HomeComponent,
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);