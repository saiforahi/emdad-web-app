import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerPaymentHistoryPageComponent } from './seller-payment-history-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';

const routes: Routes = [
  {path:'', component: SellerPaymentHistoryPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SellerPaymentHistoryPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule
  ]
})
export class SellerPaymentHistoryPageModule { }
