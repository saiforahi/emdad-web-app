import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/shared/services/user-auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'seller/login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  // {
  //   path: 'buyer/login',
  //   loadChildren: () =>
  //     import('./pages/login-page/login-page.module').then(
  //       (m) => m.LoginPageModule
  //     ),
  // },
  {
    path: 'seller/signup',
    loadChildren: () =>
      import('./pages/signup-page/signup-page.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart-page/cart-page.module').then(
        (m) => m.CartPageModule
      ),
  },
  {
    path: 'profile/:id',
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
      import('./pages/product-details-page/product-details-page.module').then(
        (m) => m.ProductDetailsPageModule
      ),
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
    path: 'forget-password',
    loadChildren: () =>
      import('./pages/forget-password-page/forget-password-page.module').then(
        (m) => m.ForgetPasswordPageModule
      ),
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
    path: 'subscription/plans/history',
    loadChildren: () =>
      import(
        './pages/seller-subscription-history-page/seller-subscription-history-page.module'
      ).then((m) => m.SellerSubscriptionHistoryPageModule),
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
      import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule),
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
    path: 'rfq',
    loadChildren: () =>
      import('./pages/rfq-page/rfq-page.module').then((m) => m.RfqPageModule),
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
    path: '**',
    loadChildren: () =>
      import('./pages/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
