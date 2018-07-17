import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routing';
import { EqualValidator } from './_directives/equal-validator.directive';
import { ClickOutsideDirective } from './_directives/dropdown.directive';
import { SearchFilterPipe } from './_shared/filter-pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { LoadingModule } from 'ngx-loading';
import { TokenInterceptor } from './_interceptors/token.interceptor';
import { UserService } from './_services/user.service';
import { ProviderService } from './_services/provider.service';
import { ProfessionService } from './_services/profession.service';
import { CityService } from './_services/city.service';
import { AccountService } from './_services/account.service';
import { DataService } from './_services/data.service';
import { DataProviderService } from './_services/data-provider.service';
import { SearchService } from './_services/search.service';
import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { VisitService } from './_services/visit.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ProviderRegistryComponent } from './provider-registry/provider-registry.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserRegistryComponent } from './user-registry/user-registry.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { RequestVisitComponent } from './request-visit/request-visit.component';
import { OnlineQuoteComponent } from './online-quote/online-quote.component';
import { MyDatePickerModule } from 'mydatepicker';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { DynamicFormTestComponent } from './dynamic-form-test/dynamic-form-test.component';
import { UserDashboardMenuComponent } from './user-dashboard-menu/user-dashboard-menu.component';
import { ProviderDashboardMenuComponent } from './provider-dashboard-menu/provider-dashboard-menu.component';
import { ProviderDashboardProfileComponent } from './provider-dashboard-profile/provider-dashboard-profile.component';
import { ProviderDashboardRatingsComponent } from './provider-dashboard-ratings/provider-dashboard-ratings.component';
import { ProviderDashboardHomeComponent } from './provider-dashboard-home/provider-dashboard-home.component';
import { ProviderDashboardProfileEditComponent } from './provider-dashboard-profile-edit/provider-dashboard-profile-edit.component';
import { UserDashboardProfileComponent } from './user-dashboard-profile/user-dashboard-profile.component';
import { UserDashboardProfileEditComponent } from './user-dashboard-profile-edit/user-dashboard-profile-edit.component';
import { UserDashboardVisitComponent } from './user-dashboard-visit/user-dashboard-visit.component';
import { ProviderDashboardVisitComponent } from './provider-dashboard-visit/provider-dashboard-visit.component';
import { ProviderDashboardQuotationComponent } from './provider-dashboard-quotation/provider-dashboard-quotation.component';
import { ProviderDashboardNegotiationComponent } from './provider-dashboard-negotiation/provider-dashboard-negotiation.component';
import { UserDashboardNegotiationComponent } from './user-dashboard-negotiation/user-dashboard-negotiation.component';
import { UserDashboardQuotationComponent } from './user-dashboard-quotation/user-dashboard-quotation.component';
import { UserDashboardHomeComponent } from './user-dashboard-home/user-dashboard-home.component';
import { UserDashboardVisitPendingComponent } from './user-dashboard-visit-pending/user-dashboard-visit-pending.component';
import { UserDashboardVisitAcceptedComponent } from './user-dashboard-visit-accepted/user-dashboard-visit-accepted.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostponeModalComponent } from './postpone-modal/postpone-modal.component';
import { ProviderDashboardVisitAcceptedComponent } from './provider-dashboard-visit-accepted/provider-dashboard-visit-accepted.component';
import { ProviderDashboardVisitPendingComponent } from './provider-dashboard-visit-pending/provider-dashboard-visit-pending.component';
import { DetailsVisitModalComponent } from './details-visit-modal/details-visit-modal.component';
import { AcceptVisitModalComponent } from './accept-visit-modal/accept-visit-modal.component';
import { AlertComponent } from './alert/alert.component';
import { UserDashboardVisitUnfulfilledComponent } from './user-dashboard-visit-unfulfilled/user-dashboard-visit-unfulfilled.component';
import { ProviderDashboardVisitUnfulfilledComponent } from './provider-dashboard-visit-unfulfilled/provider-dashboard-visit-unfulfilled.component';
import { UnfulfilledModalComponent } from './unfulfilled-modal/unfulfilled-modal.component';
import { UserDashboardNegotiationPendingComponent } from './user-dashboard-negotiation-pending/user-dashboard-negotiation-pending.component';
import { UserDashboardNegotiationConcretedComponent } from './user-dashboard-negotiation-concreted/user-dashboard-negotiation-concreted.component';
import { ProviderDashboardNegotiationConcretedComponent } from './provider-dashboard-negotiation-concreted/provider-dashboard-negotiation-concreted.component';
import { ProviderDashboardNegotiationPendingComponent } from './provider-dashboard-negotiation-pending/provider-dashboard-negotiation-pending.component';
import { AgreementModalComponent } from './agreement-modal/agreement-modal.component';
import { DetailsWorkModalComponent } from './details-work-modal/details-work-modal.component';
import { UserOnlineQuoteComponent } from './user-online-quote/user-online-quote.component';
import { ProviderOnlineQuoteComponent } from './provider-online-quote/provider-online-quote.component';
import { DetailsContractModalComponent } from './details-contract-modal/details-contract-modal.component';
import { UserManageContractComponent } from './user-manage-contract/user-manage-contract.component';
import { ProviderManageContractComponent } from './provider-manage-contract/provider-manage-contract.component';
import { ExtensionModalComponent } from './extension-modal/extension-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    UserRegistryComponent,
    ProviderRegistryComponent,
    EqualValidator,
    ClickOutsideDirective,
    SearchFilterPipe,
    AccountCreatedComponent,
    ConfirmRegistrationComponent,
    UserDashboardComponent,
    ProviderDashboardComponent,
    ProviderListComponent,
    RequestVisitComponent,
    OnlineQuoteComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    DynamicFormTestComponent,
    UserDashboardMenuComponent,
    ProviderDashboardMenuComponent,
    ProviderDashboardProfileComponent,
    ProviderDashboardRatingsComponent,
    ProviderDashboardHomeComponent,
    ProviderDashboardProfileEditComponent,
    UserDashboardProfileComponent,
    UserDashboardProfileEditComponent,
    UserDashboardVisitComponent,
    ProviderDashboardVisitComponent,
    ProviderDashboardQuotationComponent,
    ProviderDashboardNegotiationComponent,
    UserDashboardNegotiationComponent,
    UserDashboardQuotationComponent,
    UserDashboardHomeComponent,
    UserDashboardVisitPendingComponent,
    UserDashboardVisitAcceptedComponent,
    ConfirmModalComponent,
    PostponeModalComponent,
    ProviderDashboardVisitAcceptedComponent,
    ProviderDashboardVisitPendingComponent,
    DetailsVisitModalComponent,
    AcceptVisitModalComponent,
    AlertComponent,
    UserDashboardVisitUnfulfilledComponent,
    ProviderDashboardVisitUnfulfilledComponent,
    UnfulfilledModalComponent,
    UserDashboardNegotiationPendingComponent,
    UserDashboardNegotiationConcretedComponent,
    ProviderDashboardNegotiationConcretedComponent,
    ProviderDashboardNegotiationPendingComponent,
    AgreementModalComponent,
    DetailsWorkModalComponent,
    UserOnlineQuoteComponent,
    ProviderOnlineQuoteComponent,
    DetailsContractModalComponent,
    UserManageContractComponent,
    ProviderManageContractComponent,
    ExtensionModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    TextMaskModule,
    LoadingModule,
    MyDatePickerModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    ConfirmModalComponent,
    PostponeModalComponent, 
    DetailsVisitModalComponent,
    AcceptVisitModalComponent,
    UnfulfilledModalComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AccountService, UserService, ProviderService, CityService, DataService,
    DataProviderService,ProfessionService, SearchService, 
    AuthGuard, AuthService,VisitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
