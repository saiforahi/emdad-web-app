import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { BuyerOrderHistoryDetailsRoutingModule } from './buyer-order-history-details-routing.module';
import { BuyerOrderHistoryDetailsComponent } from './buyer-order-history-details.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [BuyerOrderHistoryDetailsComponent],
  imports: [
    CommonModule,NgxSpinnerModule,TranslateModule,
    BuyerOrderHistoryDetailsRoutingModule
  ]
})
export class BuyerOrderHistoryDetailsModule { }
