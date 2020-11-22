import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './signup-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  {path:'', component: SignupPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class SignupPageModule { }
