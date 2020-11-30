import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component: ProfilePageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfilePageModule { }
