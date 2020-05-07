import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';
import { OpenLinkInNewWindowDirective } from './_directives/external-url.directive';
import { ClickOutsideDirective } from './_directives/dropdown.directive';
import { EqualValidator } from './_directives/equal-validator.directive';
import { SearchFilterPipe } from './_shared/filter-pipe';
import { FileValidator } from './_directives/file-validator';
import { FileValueAccessor } from './_directives/file-value';
import { LoadingModule } from 'ngx-loading';
import { TextMaskModule } from 'angular2-text-mask';
import { AlertComponent } from './alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineEditComponent } from './inline-edit/inline-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    LoadingModule,
    TextMaskModule,
    NgbModule.forRoot()
  ],
  declarations: [
    OpenLinkInNewWindowDirective,
    ClickOutsideDirective,
    EqualValidator,
    FileValidator,
    FileValueAccessor,
    SearchFilterPipe,
    AlertComponent,
    InlineEditComponent
  ],
  exports: [
    FormsModule,
    OpenLinkInNewWindowDirective,
    ClickOutsideDirective,
    EqualValidator,
    FileValidator,
    FileValueAccessor,
    SearchFilterPipe,
    LoadingModule,
    TextMaskModule,
    AlertComponent,
    NgbModule,
    InlineEditComponent
  ]
})
export class SharedModule { }
