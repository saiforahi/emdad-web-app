import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOrdersPageComponent } from './current-orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { OrderViewModalComponent } from './order-view-modal/order-view-modal.component';
import { NgxSpinnerModule } from "ngx-spinner";
const routes: Routes = [
  {path:'', component: CurrentOrdersPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [CurrentOrdersPageComponent, OrderViewModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule,
    NgbModule,
    NgxSpinnerModule
  ],
  entryComponents: [OrderViewModalComponent],
})
export class CurrentOrdersPageModule { }
