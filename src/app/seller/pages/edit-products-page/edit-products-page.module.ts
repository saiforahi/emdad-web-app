import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductsPageComponent } from './edit-products-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { DialogueComponent } from '../sller-products-page/dialogue/dialogue.component';
const routes: Routes = [
  {path:'', component: EditProductsPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [EditProductsPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule,
  ],
  entryComponents: [DialogueComponent],
})
export class EditProductsPageModule { }
