import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerOrderHistoryDetailsRoutingModule } from './buyer-order-history-details-routing.module';
import { BuyerOrderHistoryDetailsComponent } from './buyer-order-history-details.component';


@NgModule({
  declarations: [BuyerOrderHistoryDetailsComponent],
  imports: [
    CommonModule,
    BuyerOrderHistoryDetailsRoutingModule
  ]
})
export class BuyerOrderHistoryDetailsModule { }
