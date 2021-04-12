import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/user-auth.service';
import { BuyerComponent } from './buyer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './buyer.module';
import { HttpClient } from '@angular/common/http';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: BuyerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home-page/home-page.module').then(
            (m) => m.HomePageModule
          ),
      },
      // {
      //   path: 'seller/login',
      //   loadChildren: () =>
      //     import('../seller/pages/login-page/login-page.module').then(
      //       (m) => m.LoginPageModule
      //     ),
      // },
      // {
      //   path: 'seller/signup',
      //   loadChildren: () =>
      //     import('../seller/pages/signup-page/signup-page.module').then(
      //       (m) => m.SignupPageModule
      //     ),
      // },
      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/cart-page/cart-page.module').then(
            (m) => m.CartPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./pages/profile-page/profile-page.module').then(
            (m) => m.ProfilePageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./pages/add-product-page/add-product-page.module').then(
            (m) => m.AddProductPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'product/details/:id',
        loadChildren: () =>
          import(
            './pages/product-details-page/product-details-page.module'
          ).then((m) => m.ProductDetailsPageModule),
      },
      {
        path: 'products/seller/:id',
        loadChildren: () =>
          import('./pages/product-list-page/product-list-page.module').then(
            (m) => m.ProductListPageModule
          ),
      },
      {
        path: 'products/category/:id',
        loadChildren: () =>
          import('./pages/product-list-page/product-list-page.module').then(
            (m) => m.ProductListPageModule
          ),
      },
      {
        path: 'products/categories',
        loadChildren: () =>
          import('./pages/product-list-page/product-list-page.module').then(
            (m) => m.ProductListPageModule
          ),
      },
      {
        path: 'forget-password',
        loadChildren: () =>
          import(
            './pages/forget-password-page/forget-password-page.module'
          ).then((m) => m.ForgetPasswordPageModule),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('./pages/reset-password-page/reset-password-page.module').then(
            (m) => m.ResetPasswordPageModule
          ),
      },
      {
        path: 'subscription/plans',
        loadChildren: () =>
          import(
            './pages/subscription-plan-page/subscription-plan-page.module'
          ).then((m) => m.SubscriptionPlanPageModule),
      },
      {
        path: 'subscription/payment',
        loadChildren: () =>
          import('./pages/seller-payment-page/seller-payment-page.module').then(
            (m) => m.SellerPaymentPageModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./pages/seller-orders-page/seller-orders-page.module').then(
            (m) => m.SellerOrdersPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'order/details/:order_id',
        loadChildren: () =>
          import(
            './pages/buyer-order-history-details/buyer-order-history-details.module'
          ).then((m) => m.BuyerOrderHistoryDetailsModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'track-orders',
        loadChildren: () =>
          import('./pages/track-order/track-order.module').then(
            (m) => m.TrackOrderModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./pages/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'support-ticket',
        loadChildren: () =>
          import('./pages/support-ticket-page/support-ticket-page.module').then(
            (m) => m.SupportTicketPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'open-ticket',
        loadChildren: () =>
          import('./pages/open-ticket-page/open-ticket-page.module').then(
            (m) => m.OpenTicketPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./pages/search-page/search-page.module').then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: 'rfq/:id',
        loadChildren: () =>
          import('./pages/rfq-page/rfq-page.module').then(
            (m) => m.RfqPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('./pages/wishlist-page/wishlist-page.module').then(
            (m) => m.WishlistPageModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'payment-verify',
        loadChildren: () =>
          import('./pages/payment-verify/payment-verify.module').then(
            (m) => m.PaymentVerifyModule
          ),
      },
      {
        path: 'sell-on-emdad',
        loadChildren: () =>
          import('./pages/sell-on-emdad-page/sell-on-emdad-page.module').then(
            (m) => m.SellOnEmdadPageModule
          ),
      },

      {
        path: 'about-us',
        loadChildren: () =>
          import('./pages/about-us/about-us.module').then(
            (m) => m.AboutUsModule
          ),
      },
      {
        path: 'our-partners',
        loadChildren: () =>
          import('./pages/our-partners/our-partners.module').then(
            (m) => m.OurPartnersModule
          ),
      },
      {
        path: 'registration/profile/verify/:token',
        loadChildren: () =>
          import('./pages/verify-profile-page/verify-profile-page.module').then(
            (m) => m.VerifyProfilePageModule
          ),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./pages/privacy-policy-page/privacy-policy-page.module').then(
            (m) => m.PrivacyPolicyPageModule
          ),
      },
      {
        path: 'terms-conditions',
        loadChildren: () =>
          import(
            './pages/terms-condition-page/terms-condition-page.module'
          ).then((m) => m.TermsConditionPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule, TranslateModule],
})
export class BuyerRoutingModule {}
