import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListPageComponent } from './product-list-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from '../../../ui/commonui/commonui.module';
import { MaterialModule } from '../../../material.module';

const routes: Routes = [
  {path:'', component: ProductListPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [ProductListPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    MaterialModule
  ]
})
export class ProductListPageModule { }
