import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentHistoryPageComponent } from './payment-history-page.component';

const routes: Routes = [{ path: '', component: PaymentHistoryPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentHistoryPageRoutingModule { }
