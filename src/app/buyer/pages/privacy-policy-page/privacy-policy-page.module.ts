import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyPageComponent } from './privacy-policy-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';

const routes: Routes = [
  { path: '', component: PrivacyPolicyPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [PrivacyPolicyPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    MaterialModule,
  ],
})
export class PrivacyPolicyPageModule {}
