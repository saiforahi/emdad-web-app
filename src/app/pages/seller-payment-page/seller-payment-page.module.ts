import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerPaymentPageComponent } from './seller-payment-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  {path:'', component: SellerPaymentPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SellerPaymentPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class SellerPaymentPageModule { }
