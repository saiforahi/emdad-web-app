import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordPageComponent } from './change-password-page.component';

const routes: Routes = [{ path: '', component: ChangePasswordPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordPageRoutingModule { }
