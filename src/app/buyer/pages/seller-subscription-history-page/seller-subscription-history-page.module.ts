import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerSubscriptionHistoryPageComponent } from './seller-subscription-history-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  {path:'', component: SellerSubscriptionHistoryPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SellerSubscriptionHistoryPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class SellerSubscriptionHistoryPageModule { }
