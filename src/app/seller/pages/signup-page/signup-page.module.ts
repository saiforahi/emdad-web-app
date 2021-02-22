import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupPageComponent } from './signup-page.component';
import { SellerSignupFormComponent } from '../../../buyer/components/seller-signup-form/seller-signup-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  {path:'', component: SignupPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [
    SignupPageComponent,
    SellerSignupFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    NgxSpinnerModule
  ]
})
export class SignupPageModule { }
