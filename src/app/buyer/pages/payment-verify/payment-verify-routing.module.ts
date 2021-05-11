import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PaymentVerifyComponent } from './payment-verify.component';

const routes: Routes = [{ path: '', component: PaymentVerifyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule]
})
export class PaymentVerifyRoutingModule { }
