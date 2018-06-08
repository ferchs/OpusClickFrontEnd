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
    UserDashboardQuotationComponent
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
    MyDatePickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AccountService, UserService, ProviderService, CityService, DataService,
    DataProviderService, ProfessionService, SearchService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
