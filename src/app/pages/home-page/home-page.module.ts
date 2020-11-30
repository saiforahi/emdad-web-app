import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { MaterialModule } from '../../material.module';

const routes: Routes = [
  {path:'', component: HomePageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [
    HomePageComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule
  ]
})
export class HomePageModule { }
