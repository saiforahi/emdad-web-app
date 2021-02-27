import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordPageRoutingModule } from './change-password-page-routing.module';
import { ChangePasswordPageComponent } from './change-password-page.component';


@NgModule({
  declarations: [ChangePasswordPageComponent],
  imports: [
    CommonModule,
    ChangePasswordPageRoutingModule
  ]
})
export class ChangePasswordPageModule { }
