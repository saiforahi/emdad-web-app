import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordPageComponent } from './forget-password-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForgetPsswordFormComponent } from '../../components/forget-pssword-form/forget-pssword-form.component';

const routes: Routes = [
  { path: '', component: ForgetPasswordPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ForgetPasswordPageComponent,
    ForgetPsswordFormComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class ForgetPasswordPageModule {}
