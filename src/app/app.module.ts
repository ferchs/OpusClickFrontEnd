import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing } from './app.routing';
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
import { EPaycoService } from './_services/epayco.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AccountCreatedComponent } from './account-created/account-created.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProviderRegistryComponent } from './provider-registry/provider-registry.component';
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
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PostponeModalComponent } from './postpone-modal/postpone-modal.component';
import { DetailsVisitModalComponent } from './details-visit-modal/details-visit-modal.component';
import { AcceptVisitModalComponent } from './accept-visit-modal/accept-visit-modal.component';
import { UnfulfilledModalComponent } from './unfulfilled-modal/unfulfilled-modal.component';
import { DetailsWorkModalComponent } from './details-work-modal/details-work-modal.component';
import { UserOnlineQuoteComponent } from './user-online-quote/user-online-quote.component';
import { DetailsContractModalComponent } from './details-contract-modal/details-contract-modal.component';
import { UserManageContractComponent } from './user-manage-contract/user-manage-contract.component';
import { ProviderManageContractComponent } from './provider-manage-contract/provider-manage-contract.component';
import { ExtensionModalComponent } from './extension-modal/extension-modal.component';
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
import { UserPaymentSummaryComponent } from './user-payment-summary/user-payment-summary.component';
import { NavbarModuleModule } from './navbar-module/navbar-module.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    UserRegistryComponent,
    ProviderRegistryComponent,
    AccountCreatedComponent,
    ConfirmRegistrationComponent,
    ProviderListComponent,
    RequestVisitComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    DynamicFormTestComponent,
    ConfirmModalComponent,
    PostponeModalComponent,
    DetailsVisitModalComponent,
    AcceptVisitModalComponent,
    UnfulfilledModalComponent,
    DetailsWorkModalComponent,
    UserOnlineQuoteComponent,
    DetailsContractModalComponent,
    UserManageContractComponent,
    ProviderManageContractComponent,
    ExtensionModalComponent,
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
    ProviderViewCompleteProfileComponent,
    UserPaymentSummaryComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    NavbarModuleModule,
    MyDatePickerModule,
    NouisliderModule,
    CurrencyMaskModule
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
    ProviderQuoteService,ContractService,ReviewService,PaymentService,EPaycoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
