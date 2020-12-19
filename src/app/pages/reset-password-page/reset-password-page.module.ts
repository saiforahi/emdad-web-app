import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordPageComponent } from './reset-password-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordFormComponent } from '../../components//reset-password-form/reset-password-form.component';

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
  ],
})
export class ResetPasswordPageModule {}
