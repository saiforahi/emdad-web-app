import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { BuyerOrderHistoryDetailsRoutingModule } from './buyer-order-history-details-routing.module';
import { BuyerOrderHistoryDetailsComponent } from './buyer-order-history-details.component';
import { AngularCreatePdfModule } from 'angular-create-pdf';
@NgModule({
  declarations: [BuyerOrderHistoryDetailsComponent],
  imports: [
    CommonModule,AngularCreatePdfModule,NgxSpinnerModule,
    BuyerOrderHistoryDetailsRoutingModule
  ]
})
export class BuyerOrderHistoryDetailsModule { }
