import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BulkUploadProductsComponent } from './bulk-upload-products.component';
import { NgxDropzoneModule } from 'ngx-dropzone';

const routes: Routes = [
  { path: '', component: BulkUploadProductsComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [BulkUploadProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
  ],
})
export class BulkUploadProductsModule {}
