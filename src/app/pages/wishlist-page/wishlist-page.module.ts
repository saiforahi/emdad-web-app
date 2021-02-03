import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistPageComponent } from './wishlist-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from '../../ui/commonui/commonui.module';

const routes: Routes = [
  { path: '', component: WishlistPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [WishlistPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CommonuiModule],
})
export class WishlistPageModule {}
