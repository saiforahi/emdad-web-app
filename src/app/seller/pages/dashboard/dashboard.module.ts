import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonuiModule } from '../../../ui/commonui/commonui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path:'', component: DashboardComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MaterialModule,
    LazyLoadImageModule,
    CommonuiModule,
    NgbModule
  ]
})
export class DashboardModule { }
