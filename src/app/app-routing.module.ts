import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/shared/services/user-auth.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  { path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup-page/signup-page.module').then(m => m.SignupPageModule) },
  { path: 'cart', loadChildren: () => import('./pages/cart-page/cart-page.module').then(m => m.CartPageModule), canActivate: [AuthGuard] },
  { path: 'profile/:id', loadChildren: () => import('./pages/profile-page/profile-page.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard] },
  { path: 'product/details/:id', loadChildren: () => import('./pages/product-details-page/product-details-page.module').then(m => m.ProductDetailsPageModule) },
  { path: 'products/seller/:id', loadChildren: () => import('./pages/product-list-page/product-list-page.module').then(m => m.ProductListPageModule) },

  { path: '**', loadChildren: () => import('./pages/error-page/error-page.module').then(m => m.ErrorPageModule) },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
