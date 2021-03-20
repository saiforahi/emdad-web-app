import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { PaymentVerifyRoutingModule } from './payment-verify-routing.module';
import { PaymentVerifyComponent } from './payment-verify.component';


@NgModule({
  declarations: [PaymentVerifyComponent],
  imports: [
    CommonModule,NgxSpinnerModule,
    PaymentVerifyRoutingModule
  ]
})
export class PaymentVerifyModule { }
