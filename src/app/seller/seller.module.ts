import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from '../seller/seller.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonuiModule } from '../ui/commonui/commonui.module';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [SellerComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    NgbModule,
    MaterialModule,
    CommonuiModule
  ]
})
export class SellerModule { }
