import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadProductsPageComponent } from './upload-products-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path:'', component: UploadProductsPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [UploadProductsPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule,
    NgbModule
  ]
})
export class UploadProductsPageModule { }
