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
import { ProviderRequestPaymentComponent } from './provider-request-payment/provider-request-payment.component';
import { ProviderViewCompleteProfileComponent } from './provider-view-complete-profile/provider-view-complete-profile.component';
import { ViewContractComponent } from './view-contract/view-contract.component';
import { ViewSignedContractComponent } from './view-signed-contract/view-signed-contract.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { RequestVisitComponent } from './request-visit/request-visit.component';
import { UserOnlineQuoteComponent } from './user-online-quote/user-online-quote.component';
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
    {path:'blog', loadChildren: './information-pages/information-pages.module#InformationPagesModule'},
    {path:'dashboard_usuario', 
    loadChildren: './dashboard-user/dashboard-user.module#DashboardUserModule',
    canActivateChild: [AuthGuard]
    },
    {path:'dashboard_experto', 
    loadChildren: './dashboard-provider/dashboard-provider.module#DashboardProviderModule',
    canActivateChild: [AuthGuard]
    },
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