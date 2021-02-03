import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyerOrderHistoryDetailsComponent } from './buyer-order-history-details.component';

const routes: Routes = [{ path: '', component: BuyerOrderHistoryDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerOrderHistoryDetailsRoutingModule { }
