import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  SellerAuthGuard,
  IsSignedInGuard
} from '../shared/services/user-auth.service';
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
        canActivate: [IsSignedInGuard],
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./pages/signup-page/signup-page.module').then(
            (m) => m.SignupPageModule
          ),
        canActivate: [IsSignedInGuard],
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import(
            './pages/forgot-password-page/forgot-password-page.module'
          ).then((m) => m.ForgotPasswordPageModule),
        canActivate: [IsSignedInGuard],
      },
      {
        path: 'welcome',
        loadChildren: () =>
          import(
            './pages/welcome-page/welcome-page.module'
          ).then((m) => m.WelcomePageModule),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/seller-profile-page/seller-profile-page.module').then(
            (m) => m.SellerProfilePageModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'bank-info',
        loadChildren: () =>
          import('./pages/bank-info-page/bank-info-page.module').then(
            (m) => m.BankInfoPageModule
          ),
        canActivate: [SellerAuthGuard],
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
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'subscription-plan',
        loadChildren: () =>
          import(
            './pages/subscription-plan-page/subscription-plan-page.module'
          ).then((m) => m.SubscriptionPlanPageModule),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'subscription-payment',
        loadChildren: () =>
          import('./pages/payment-page/payment-page.module').then(
            (m) => m.PaymentPageModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'upload-products',
        loadChildren: () =>
          import(
            './pages/upload-products-page/upload-products-page.module'
          ).then((m) => m.UploadProductsPageModule),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'edit-products/:id',
        loadChildren: () =>
          import('./pages/edit-products-page/edit-products-page.module').then(
            (m) => m.EditProductsPageModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'manage-rfqs',
        loadChildren: () =>
          import('./pages/manage-rfq/manage-rfq.module').then(
            (m) => m.ManageRfqModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/sller-products-page/sller-products-page.module').then(
            (m) => m.SllerProductsPageModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'products/category/:s_uid/:id',
        loadChildren: () =>
          import('./pages/sller-products-page/sller-products-page.module').then(
            (m) => m.SllerProductsPageModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'bulk-products-upload',
        loadChildren: () =>
          import(
            './pages/bulk-upload-products/bulk-upload-products.module'
          ).then((m) => m.BulkUploadProductsModule),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'manage-quotations',
        loadChildren: () =>
          import('./pages/manage-quotations/manage-quotations.module').then(
            (m) => m.ManageQuotationsModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'current-orders',
        loadChildren: () =>
          import('./pages/current-orders-page/current-orders-page.module').then(
            (m) => m.CurrentOrdersPageModule
          ),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'order-history',
        loadChildren: () =>
          import(
            './pages/seller-order-history-page/seller-order-history-page.module'
          ).then((m) => m.SellerOrderHistoryPageModule),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import(
            './pages/seller-invoices-page/seller-invoices-page.module'
          ).then((m) => m.SellerInvoicesPageModule),
        canActivate: [SellerAuthGuard],
      },
      {
        path: 'support',
        loadChildren: () =>
          import('./pages/support-page/support-page.module').then(
            (m) => m.SupportPageModule
          ),
        canActivate: [SellerAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),TranslateModule],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
