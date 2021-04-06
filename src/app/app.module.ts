import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  UserAuthService,
  AuthInterceptor,
  AuthGuard,
  SellerAuthInterceptor,
  SellerAuthGuard,
  // SellerApproveGuard,
  // SellerSubscribedGuard
} from '../app/shared/services/user-auth.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CategoryMenuComponent } from './buyer/components/category-menu/category-menu.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonuiModule } from './ui/commonui/commonui.module';
// import { BuyerSigninFormComponent } from './buyer/components/buyer-login-modal-form/buyer-login-modal-form.component';
// import { BuyerRegistrationFormComponent } from './buyer/components/buyer-registration-modal-form/buyer-registration-modal-form.component';
import { SupportTicketPageComponent } from './buyer/pages/support-ticket-page/support-ticket-page.component';
import { OpenTicketPageComponent } from './buyer/pages/open-ticket-page/open-ticket-page.component';
import { RfqPageComponent } from './buyer/pages/rfq-page/rfq-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
@NgModule({
  declarations: [
    AppComponent,
    CategoryMenuComponent,
    SupportTicketPageComponent,
    OpenTicketPageComponent,
    RfqPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    CommonuiModule,
    NgxSpinnerModule,
    SellerModule,
    BuyerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [
    UserAuthService,
    AuthGuard,
    SellerAuthGuard,
    // SellerApproveGuard,
    // SellerSubscribedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SellerAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
