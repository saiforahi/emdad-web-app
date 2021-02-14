import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../buyer/components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchForComponent } from '../../buyer/components/search-for/search-for.component';
import { BreadcrumbsComponent } from '../../buyer/components/breadcrumbs/breadcrumbs.component';
import { ProductCardComponent } from '../../buyer/components/product-card/product-card.component';
import { HeaderComponent } from 'src/app/buyer/components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const UI = [ProductListComponent, SearchForComponent, BreadcrumbsComponent, ProductCardComponent, HeaderComponent];

@NgModule({
  declarations: [UI],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    NgbModule
  ],
  exports: [UI],
})
export class CommonuiModule {}
