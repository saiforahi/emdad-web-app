import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddProductPageComponent } from './add-product-page.component';
import { AddProductFormComponent } from '../../components/add-product-form/add-product-form.component';

const routes: Routes = [
	{ path: '', component: AddProductPageComponent, pathMatch: 'full' },
];

@NgModule({
	declarations: [AddProductPageComponent, AddProductFormComponent],
	imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
})
export class AddProductPageModule {}
