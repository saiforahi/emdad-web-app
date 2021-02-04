import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentVerifyComponent } from './payment-verify.component';

const routes: Routes = [{ path: '', component: PaymentVerifyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentVerifyRoutingModule { }
