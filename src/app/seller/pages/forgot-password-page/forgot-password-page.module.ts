import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordPageRoutingModule } from './forgot-password-page-routing.module';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';


@NgModule({
  declarations: [ForgotPasswordPageComponent],
  imports: [
    CommonModule,
    ForgotPasswordPageRoutingModule
  ]
})
export class ForgotPasswordPageModule { }
