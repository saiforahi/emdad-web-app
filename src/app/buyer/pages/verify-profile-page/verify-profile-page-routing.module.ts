import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyProfilePageComponent } from './verify-profile-page.component';

const routes: Routes = [{ path: '', component: VerifyProfilePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyProfilePageRoutingModule { }
