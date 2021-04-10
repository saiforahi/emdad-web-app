import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from '../seller/seller.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonuiModule } from '../ui/commonui/commonui.module';
import { MaterialModule } from '../material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [SellerComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    NgbModule,
    MaterialModule,
    CommonuiModule,
    NgxSpinnerModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false,
      extend: true
    })
  ],
  exports:[TranslateModule]
})
export class SellerModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"../../assets/i18n/", ".json");
}