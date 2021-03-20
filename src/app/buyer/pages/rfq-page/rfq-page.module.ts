import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import{ CommonuiModule} from '../../../ui/commonui/commonui.module';
import { RfqPageComponent } from './rfq-page.component';

const routes: Routes = [
  { path: '', component: RfqPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    CommonuiModule
  ],
})
export class RfqPageModule {}
