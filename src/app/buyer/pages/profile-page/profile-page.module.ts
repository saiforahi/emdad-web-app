import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from './profile-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';
import { EditProfileFormComponent } from '../../components/edit-profile-form/edit-profile-form.component';
import { OrderHistoryComponent } from '../../components/order-history-table/order-history-table.component';
import { ManageQuotations } from '../../components/manage-quotations-table/manage-quotations-table.component';
import { ProfileLogoutModal } from '../../components/profile-logout-modal/profile-logout-modal.component';
// import {QuotationDetailsModal} from '../../components/quotation-details-modal/quotation-details-modal.component';
import { MaterialModule } from 'src/app/material.module';
import { BuyerQuotationViewComponent } from '../../components/buyer-quotation-view/buyer-quotation-view.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: ProfilePageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ProfilePageComponent,
    ChangePasswordFormComponent,
    EditProfileFormComponent,
    OrderHistoryComponent,
    ManageQuotations,
    ProfileLogoutModal,
    BuyerQuotationViewComponent
    // QuotationDetailsModal
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MaterialModule,
    TranslateModule
  ],
  exports:[TranslateModule],
  entryComponents: [BuyerQuotationViewComponent,ProfileLogoutModal],
})
export class ProfilePageModule {}
