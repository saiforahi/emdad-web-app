import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordPageComponent } from './reset-password-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordFormComponent } from '../../components//reset-password-form/reset-password-form.component';
import { MaterialModule } from '../../../material.module';
import { NgxSpinnerModule } from "ngx-spinner";
const routes: Routes = [
  { path: '', component: ResetPasswordPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ResetPasswordPageComponent, ResetPasswordFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResetPasswordPageModule {}
