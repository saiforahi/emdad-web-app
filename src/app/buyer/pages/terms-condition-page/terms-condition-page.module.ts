import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionPageComponent } from './terms-condition-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';

const routes: Routes = [
  { path: '', component: TermsConditionPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [TermsConditionPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    MaterialModule,
  ]
})
export class TermsConditionPageModule { }
