import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { MaterialModule } from '../../../material.module';

const routes: Routes = [
  { path: '', component: AboutUsComponent, pathMatch: 'full' },
];
@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    MaterialModule
  ]
})
export class AboutUsModule { }
