import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonuiModule } from '../ui/commonui/commonui.module';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [BuyerComponent],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    NgbModule,
    MaterialModule,
    CommonuiModule,
  ],
})
export class BuyerModule {}
