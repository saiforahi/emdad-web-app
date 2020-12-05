import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';

const routes: Routes = [
  {path:'', component: ProfilePageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [
    ProfilePageComponent,
    ChangePasswordFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfilePageModule { }
