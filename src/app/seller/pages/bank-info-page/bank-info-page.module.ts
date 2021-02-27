import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankInfoPageComponent } from './bank-info-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';

const routes: Routes = [
  {path:'', component: BankInfoPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [BankInfoPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule
  ]
})
export class BankInfoPageModule { }
