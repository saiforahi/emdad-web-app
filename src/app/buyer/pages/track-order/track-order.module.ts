import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrackOrderRoutingModule } from './track-order-routing.module';
import { TrackOrderComponent } from './track-order.component';
import {MaterialModule} from '../../../material.module'
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TrackOrderComponent],
  imports: [
    CommonModule,
    TrackOrderRoutingModule,
    MaterialModule,TranslateModule
  ]
})
export class TrackOrderModule { }
