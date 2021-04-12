import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { MaterialModule } from '../../../material.module';
import { TranslateModule } from '@ngx-translate/core';
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
    TranslateModule
  ]
})
export class CartPageModule { }
