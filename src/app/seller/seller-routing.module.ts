import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerAuthGuard } from '../shared/services/user-auth.service';
import { SellerComponent } from './seller.component';

const routes: Routes = [
  {
    path: '',
    component: SellerComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login-page/login-page.module').then(
            (m) => m.LoginPageModule
          ),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./pages/signup-page/signup-page.module').then(
            (m) => m.SignupPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
