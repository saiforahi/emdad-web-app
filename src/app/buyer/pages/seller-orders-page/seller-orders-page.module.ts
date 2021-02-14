import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerOrdersPageComponent } from './seller-orders-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from '../../../ui/commonui/commonui.module';
import { OrderDetailsModalComponent } from '../../components/order-details-modal/order-details-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: SellerOrdersPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [SellerOrdersPageComponent, OrderDetailsModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    NgbModule,
  ],
})
export class SellerOrdersPageModule {}
