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
        path: 'profile',
        loadChildren: () =>
          import('./pages/seller-profile-page/seller-profile-page.module').then(
            (m) => m.SellerProfilePageModule
          ),
      },
      {
        path: 'bank-info',
        loadChildren: () =>
          import('./pages/bank-info-page/bank-info-page.module').then(
            (m) => m.BankInfoPageModule
          ),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import(
            './pages/seller-change-pass-page/seller-change-pass-page.module'
          ).then((m) => m.SellerChangePassPageModule),
      },
      {
        path: 'payment-history',
        loadChildren: () =>
          import(
            './pages/seller-payment-history-page/seller-payment-history-page.module'
          ).then((m) => m.SellerPaymentHistoryPageModule),
      },
      {
        path: 'subscription-plan',
        loadChildren: () =>
          import(
            './pages/subscription-plan-page/subscription-plan-page.module'
          ).then((m) => m.SubscriptionPlanPageModule),
      },
      {
        path: 'upload-products',
        loadChildren: () =>
          import(
            './pages/upload-products-page/upload-products-page.module'
          ).then((m) => m.UploadProductsPageModule),
      },
     { path: 'manage-rfqs',
      loadChildren: () =>
        import(
          './pages/manage-rfq/manage-rfq.module'
        ).then((m) => m.ManageRfqModule),
    },
      {
        path: 'products',
        loadChildren: () =>
          import(
            './pages/sller-products-page/sller-products-page.module'
          ).then((m) => m.SllerProductsPageModule),
      },
      {
        path: 'bulk-products-upload',
        loadChildren: () =>
          import(
            './pages/sller-products-page/sller-products-page.module'
          ).then((m) => m.SllerProductsPageModule),
      },
      {
        path: 'manage-quotations',
        loadChildren: () =>
          import(
            './pages/manage-quotations/manage-quotations.module'
          ).then((m) => m.ManageQuotationsModule),
      },
      {
        path: 'current-orders',
        loadChildren: () =>
          import(
            './pages/current-orders-page/current-orders-page.module'
          ).then((m) => m.CurrentOrdersPageModule),
      },
      {
        path: 'order-history',
        loadChildren: () =>
          import(
            './pages/seller-order-history-page/seller-order-history-page.module'
          ).then((m) => m.SellerOrderHistoryPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
