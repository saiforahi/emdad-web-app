import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerComponent } from './buyer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonuiModule } from '../ui/commonui/commonui.module';
import { MaterialModule } from '../material.module';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [BuyerComponent],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    NgbModule,
    MaterialModule,
    CommonuiModule,
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
export class BuyerModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,"../../assets/i18n/", ".json");
}