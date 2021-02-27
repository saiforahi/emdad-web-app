import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  {path:'', component: LoginPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    NgxSpinnerModule
  ]
})
export class LoginPageModule { }
