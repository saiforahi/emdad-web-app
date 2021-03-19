import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurPartnersComponent } from './our-partners.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { MaterialModule } from '../../../material.module';

const routes: Routes = [
  { path: '', component: OurPartnersComponent, pathMatch: 'full' },
];
@NgModule({
  declarations: [OurPartnersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    MaterialModule
  ]
})
export class OurPartnersModule { }
