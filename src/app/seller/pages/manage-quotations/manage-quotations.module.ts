import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageQuotationsComponent } from './manage-quotations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { MaterialModule } from 'src/app/material.module';
import { QuotationViewModalComponent } from './quotation-view-modal/quotation-view-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path:'', component: ManageQuotationsComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [ManageQuotationsComponent, QuotationViewModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    NgxSpinnerModule,
    MaterialModule,
    NgbModule
  ],
  entryComponents: [QuotationViewModalComponent],
})
export class ManageQuotationsModule { }
