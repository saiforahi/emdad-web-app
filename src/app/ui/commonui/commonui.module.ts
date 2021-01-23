import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchForComponent } from '../../components/search-for/search-for.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

const UI = [ProductListComponent, SearchForComponent, BreadcrumbsComponent];

@NgModule({
  declarations: [UI],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
  ],
  exports: [UI],
})
export class CommonuiModule {}
