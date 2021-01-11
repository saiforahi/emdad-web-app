import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  UserAuthService,
  AuthInterceptor,
  AuthGuard,
} from '../app/shared/services/user-auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CategoryMenuComponent } from './components/category-menu/category-menu.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonuiModule } from './ui/commonui/commonui.module';
import { BuyerSigninFormComponent } from './components/buyer-login-modal-form/buyer-login-modal-form.component';
import {BuyerRegistrationFormComponent} from './components/buyer-registration-modal-form/buyer-registration-modal-form.component';

@NgModule({
  declarations: [AppComponent, CategoryMenuComponent,BuyerSigninFormComponent,BuyerRegistrationFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    CommonuiModule
  ],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [
    UserAuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
