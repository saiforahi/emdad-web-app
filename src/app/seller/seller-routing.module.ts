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
      {
        path: 'forgot-password',
        loadChildren: () =>
          import(
            './pages/forgot-password-page/forgot-password-page.module'
          ).then((m) => m.ForgotPasswordPageModule),
      },
      {
        path: 'payment-history',
        loadChildren: () =>
          import(
            './pages/payment-history-page/payment-history-page.module'
          ).then((m) => m.PaymentHistoryPageModule),
      },
      {
        path: 'subscription-plan',
        loadChildren: () =>
          import(
            './pages/subscription-plan-page/subscription-plan-page.module'
          ).then((m) => m.SubscriptionPlanPageModule),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import(
            './pages/payment-page/payment-page.module'
          ).then((m) => m.PaymentPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
