import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  {path:'', component: LoginPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginPageModule { }
