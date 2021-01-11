import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonuiModule } from '../../ui/commonui/commonui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopularProductsComponent } from '../../components/popular-products/popular-products.component';

const routes: Routes = [
  {path:'', component: HomePageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [
    HomePageComponent,
    PopularProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    LazyLoadImageModule,
    CommonuiModule,
    NgbModule
  ]
})
export class HomePageModule { }
