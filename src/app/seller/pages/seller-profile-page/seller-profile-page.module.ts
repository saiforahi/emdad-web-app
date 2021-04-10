import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerProfilePageComponent } from './seller-profile-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

const routes: Routes = [
  {path:'', component: SellerProfilePageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SellerProfilePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule,
    TranslateModule
  ]
})
export class SellerProfilePageModule { }
