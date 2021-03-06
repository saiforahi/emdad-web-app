import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentOrdersPageComponent } from './current-orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';

const routes: Routes = [
  {path:'', component: CurrentOrdersPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [CurrentOrdersPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule,
    NgbModule
  ]
})
export class CurrentOrdersPageModule { }
