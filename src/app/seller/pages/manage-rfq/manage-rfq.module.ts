import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRfqComponent } from './manage-rfq.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { ViewDialogueComponent } from './view-dialogue/view-dialogue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path:'', component: ManageRfqComponent, pathMatch:'full'}
]


@NgModule({
  declarations: [ManageRfqComponent, ViewDialogueComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  entryComponents: [ViewDialogueComponent],
})
export class ManageRfqModule { }

