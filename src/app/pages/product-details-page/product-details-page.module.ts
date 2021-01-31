import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsPageComponent } from './product-details-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from '../../ui/commonui/commonui.module';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { MaterialModule } from '../../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const routes: Routes = [
  { path: '', component: ProductDetailsPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ProductDetailsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    PinchZoomModule,
    MaterialModule,
    NgbModule,
    LazyLoadImageModule,
  ],
})
export class ProductDetailsPageModule {}
