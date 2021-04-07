import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component: WelcomePageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class WelcomePageModule { }
