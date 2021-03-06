import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerOrderHistoryPageComponent } from './seller-order-history-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { OrderHistoryModalComponent } from './order-history-modal/order-history-modal.component';

const routes: Routes = [
  { path: '', component: SellerOrderHistoryPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [SellerOrderHistoryPageComponent, OrderHistoryModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule,
    NgbModule,
  ],
  entryComponents: [OrderHistoryModalComponent],
})
export class SellerOrderHistoryPageModule {}
