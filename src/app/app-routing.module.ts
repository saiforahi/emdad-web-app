import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/shared/services/user-auth.service';
// , canActivate: [AuthGuard] 
const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  { path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup-page/signup-page.module').then(m => m.SignupPageModule) },
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
