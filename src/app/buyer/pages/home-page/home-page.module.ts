import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { CommonuiModule } from '../../../ui/commonui/commonui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopularProductsComponent } from '../../components/popular-products/popular-products.component';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [HomePageComponent, PopularProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule,
    LazyLoadImageModule,
    CommonuiModule,
    NgbModule,
    TranslateModule.forChild()
  ],
  exports:[TranslateModule],
  providers:[TranslateService]
})
export class HomePageModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"./assets/i18n/", ".json");
}