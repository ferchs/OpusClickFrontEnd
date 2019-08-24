import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routing';
import { EqualValidator } from './_directives/equal-validator.directive';
import { ClickOutsideDirective } from './_directives/dropdown.directive';
import { OpenLinkInNewWindowDirective } from './_directives/external-url.directive';
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
import { WorkService } from './_services/work.service';
import { DynamicFormService } from './_services/dynamic-form.service';
import { ProviderQuoteService } from './_services/provider-quote.service';
import { ContractService } from './_services/contract.service';
import { ReviewService } from './_services/review.service';
import { PaymentService } from './_services/payment.service';
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
import { DetailsWorkModalComponent } from './details-work-modal/details-work-modal.component';
import { UserOnlineQuoteComponent } from './user-online-quote/user-online-quote.component';
import { DetailsContractModalComponent } from './details-contract-modal/details-contract-modal.component';
import { UserManageContractComponent } from './user-manage-contract/user-manage-contract.component';
import { ProviderManageContractComponent } from './provider-manage-contract/provider-manage-contract.component';
import { ExtensionModalComponent } from './extension-modal/extension-modal.component';
import { InlineEditComponent } from './inline-edit/inline-edit.component';
import { NoAgreementModalComponent } from './no-agreement-modal/no-agreement-modal.component';
import { ReviewComponent } from './review/review.component';
import { NouisliderModule } from 'ng2-nouislider';
import { ProviderQuotationComponent } from './provider-quotation/provider-quotation.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { UserViewQuotationComponent } from './user-view-quotation/user-view-quotation.component';
import { DetailsQuotationModalComponent } from './details-quotation-modal/details-quotation-modal.component';
import { DetailsOnlineQuoteModalComponent } from './details-online-quote-modal/details-online-quote-modal.component';
import { ProviderViewQuotationComponent } from './provider-view-quotation/provider-view-quotation.component';
import { ViewContractComponent } from './view-contract/view-contract.component';
import { UserSpecifyContractComponent } from './user-specify-contract/user-specify-contract.component';
import { ViewSignedContractComponent } from './view-signed-contract/view-signed-contract.component';
import { ProviderRequestPaymentComponent } from './provider-request-payment/provider-request-payment.component';
import { UserApprovePaymentComponent } from './user-approve-payment/user-approve-payment.component';
import { ProviderViewCompleteProfileComponent } from './provider-view-complete-profile/provider-view-complete-profile.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProviderDashboardNegotiationFinishedComponent } from './provider-dashboard-negotiation-finished/provider-dashboard-negotiation-finished.component';
import { UserDashboardNegotiationFinishedComponent } from './user-dashboard-negotiation-finished/user-dashboard-negotiation-finished.component';
import { UserPaymentSummaryComponent } from './user-payment-summary/user-payment-summary.component';
import { FileValidator } from './_directives/file-validator';
import { FileValueAccessor } from './_directives/file-value';
import { InfoCarpinterosComponent } from './info-carpinteros/info-carpinteros.component';
import { InfoPlomerosComponent } from './info-plomeros/info-plomeros.component';
import { InfoPintoresComponent } from './info-pintores/info-pintores.component';
import { InfoTapicerosComponent } from './info-tapiceros/info-tapiceros.component';
import { InfoElectricistasComponent } from './info-electricistas/info-electricistas.component';
import { InfoSoldadoresComponent } from './info-soldadores/info-soldadores.component';
import { InfoAlbanilesComponent } from './info-albaniles/info-albaniles.component';

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
    DetailsWorkModalComponent,
    UserOnlineQuoteComponent,
    DetailsContractModalComponent,
    UserManageContractComponent,
    ProviderManageContractComponent,
    ExtensionModalComponent,
    InlineEditComponent,
    NoAgreementModalComponent,
    ReviewComponent,
    ProviderQuotationComponent,
    UserViewQuotationComponent,
    DetailsQuotationModalComponent,
    DetailsOnlineQuoteModalComponent,
    ProviderViewQuotationComponent,
    ViewContractComponent,
    UserSpecifyContractComponent,
    ViewSignedContractComponent,
    ProviderRequestPaymentComponent,
    UserApprovePaymentComponent,
    OpenLinkInNewWindowDirective,
    FileValidator,
    FileValueAccessor,
    ProviderViewCompleteProfileComponent,
    ProviderDashboardNegotiationFinishedComponent,
    UserDashboardNegotiationFinishedComponent,
    UserPaymentSummaryComponent,
    InfoCarpinterosComponent,
    InfoPlomerosComponent,
    InfoPintoresComponent,
    InfoTapicerosComponent,
    InfoElectricistasComponent,
    InfoSoldadoresComponent,
    InfoAlbanilesComponent
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
    NouisliderModule,
    CurrencyMaskModule,
    NgxGalleryModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    ConfirmModalComponent,
    PostponeModalComponent, 
    DetailsVisitModalComponent,
    AcceptVisitModalComponent,
    UnfulfilledModalComponent,
    DetailsWorkModalComponent,
    DetailsQuotationModalComponent,
    NoAgreementModalComponent,
    DetailsOnlineQuoteModalComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AccountService, UserService, ProviderService, CityService, DataService,
    DataProviderService,ProfessionService, SearchService, 
    AuthGuard, AuthService,VisitService,WorkService, DynamicFormService,
    ProviderQuoteService,ContractService,ReviewService,PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
