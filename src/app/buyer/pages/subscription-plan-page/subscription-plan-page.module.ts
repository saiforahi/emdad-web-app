import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlanPageComponent } from './subscription-plan-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  {path:'', component: SubscriptionPlanPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SubscriptionPlanPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class SubscriptionPlanPageModule { }
