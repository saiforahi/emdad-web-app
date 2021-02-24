import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentPageComponent } from './payment-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  {path:'', component: PaymentPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [PaymentPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule
  ]
})
export class PaymentPageModule { }
