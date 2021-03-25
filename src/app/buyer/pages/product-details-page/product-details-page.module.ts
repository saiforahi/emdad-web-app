import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsPageComponent } from './product-details-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from '../../../ui/commonui/commonui.module';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { MaterialModule } from '../../../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ProductReviewModalComponent } from './product-review-modal/product-review-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';

const routes: Routes = [
  { path: '', component: ProductDetailsPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ProductDetailsPageComponent, ProductReviewModalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    PinchZoomModule,
    MaterialModule,
    NgbModule,
    LazyLoadImageModule,
    NgxSpinnerModule,
    FormsModule,
    CarouselModule 
  ],
})
export class ProductDetailsPageModule {}
