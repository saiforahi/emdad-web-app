import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SllerProductsPageComponent } from './sller-products-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { DialogueComponent } from './dialogue/dialogue.component';

const routes: Routes = [
  {path:'', component: SllerProductsPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SllerProductsPageComponent, DialogueComponent],
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
export class SllerProductsPageModule { }
