import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerInvoicesPageComponent } from './seller-invoices-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { InvoiceViewModalComponent } from './invoice-view-modal/invoice-view-modal.component';

const routes: Routes = [
  {path:'', component: SellerInvoicesPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SellerInvoicesPageComponent, InvoiceViewModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule
  ],
  entryComponents: [InvoiceViewModalComponent],
})
export class SellerInvoicesPageModule { }
