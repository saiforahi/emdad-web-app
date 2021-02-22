import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentHistoryPageRoutingModule } from './payment-history-page-routing.module';
import { PaymentHistoryPageComponent } from './payment-history-page.component';


@NgModule({
  declarations: [PaymentHistoryPageComponent],
  imports: [
    CommonModule,
    PaymentHistoryPageRoutingModule
  ]
})
export class PaymentHistoryPageModule { }
