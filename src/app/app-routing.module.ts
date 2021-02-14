import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./buyer/buyer.module').then((m) => m.BuyerModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./seller/seller.module').then((m) => m.SellerModule),
  },
  { 
    path: 'registration/profile/verify/:token', 
    loadChildren: () => 
      import('./pages/verify-profile-page/verify-profile-page.module').then(
        m => m.VerifyProfilePageModule
      ) 
  },
  {
    path: '**',
    loadChildren: () =>
      import('./buyer/pages/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // BrowserModule,
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      // useHash: true,
      // enableTracing: false
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
