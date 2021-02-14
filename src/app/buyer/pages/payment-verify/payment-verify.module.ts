import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentVerifyRoutingModule } from './payment-verify-routing.module';
import { PaymentVerifyComponent } from './payment-verify.component';


@NgModule({
  declarations: [PaymentVerifyComponent],
  imports: [
    CommonModule,
    PaymentVerifyRoutingModule
  ]
})
export class PaymentVerifyModule { }
