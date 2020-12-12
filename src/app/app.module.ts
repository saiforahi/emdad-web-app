import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [AppComponent, CategoryMenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    BrowserAnimationsModule,
    LazyLoadImageModule
  ],
  exports: [MaterialModule],
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
