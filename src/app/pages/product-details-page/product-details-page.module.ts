import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsPageComponent } from './product-details-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from '../../ui/commonui/commonui.module';

const routes: Routes = [
  {path:'', component: ProductDetailsPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [ProductDetailsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
  ]
})
export class ProductDetailsPageModule { }
