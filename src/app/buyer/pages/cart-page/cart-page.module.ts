import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { MaterialModule } from '../../../material.module';
import { CommonuiModule } from '../../../ui/commonui/commonui.module';
const routes: Routes = [
  {path:'', component: CartPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
    CommonuiModule
    
  ]
})
export class CartPageModule { }
