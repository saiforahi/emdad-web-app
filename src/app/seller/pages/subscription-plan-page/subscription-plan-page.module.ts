import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlanPageComponent } from './subscription-plan-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { MaterialModule } from 'src/app/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {path:'', component: SubscriptionPlanPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SubscriptionPlanPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule,
    NgxSpinnerModule
  ]
})
export class SubscriptionPlanPageModule { }
