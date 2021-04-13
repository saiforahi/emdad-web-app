import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../buyer/components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchForComponent } from '../../buyer/components/search-for/search-for.component';
import { BreadcrumbsComponent } from '../../buyer/components/breadcrumbs/breadcrumbs.component';
import { ProductCardComponent } from '../../buyer/components/product-card/product-card.component';
import { HeaderComponent } from 'src/app/buyer/components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BuyerSigninFormComponent } from 'src/app/buyer/components/buyer-login-modal-form/buyer-login-modal-form.component';
import { BuyerRegistrationFormComponent } from 'src/app/buyer/components/buyer-registration-modal-form/buyer-registration-modal-form.component';
import { FooterComponent } from 'src/app/buyer/components/footer/footer.component';
import { FormInputAlertComponent } from 'src/app/seller/components/form-input-alert/form-input-alert.component';
import { SellerBreadcrumbsComponent } from 'src/app/seller/components/seller-breadcrumbs/seller-breadcrumbs.component';
import { ProductCardHorizonalComponent } from '../../buyer/components/product-card-horizonal/product-card-horizonal.component';
import { RfqModalProductDescriptionComponent } from '../../seller/components/rfq-modal-product-description/rfq-modal-product-description.component';
import { HtmltoPlainPipe } from 'src/app/shared/pipes/htmlto-plain.pipe';
import { PushIntoArrayPipe } from 'src/app/shared/pipes/push-into-array.pipe';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AddBrandModalComponent } from 'src/app/seller/components/add-brand-modal/add-brand-modal.component';
import { AddColorModalComponent } from 'src/app/seller/components/add-color-modal/add-color-modal.component';
import { AddUnitModalComponent } from 'src/app/seller/components/add-unit-modal/add-unit-modal.component';

const UI = [
  ProductListComponent,
  SearchForComponent,
  BreadcrumbsComponent,
  ProductCardComponent,
  ProductCardHorizonalComponent,
  HeaderComponent,
  BuyerSigninFormComponent,
  BuyerRegistrationFormComponent,
  FooterComponent,
  FormInputAlertComponent,
  SellerBreadcrumbsComponent,
  RfqModalProductDescriptionComponent,
  HtmltoPlainPipe,
  PushIntoArrayPipe,
  AddBrandModalComponent,
  AddColorModalComponent,
  AddUnitModalComponent,
];

@NgModule({
  declarations: [UI],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    NgbModule,
    NgxSpinnerModule,
    AutocompleteLibModule,
    TranslateModule,
  ],
  exports: [UI, TranslateModule],
  entryComponents: [
    AddBrandModalComponent,
    AddColorModalComponent,
    AddUnitModalComponent,
  ],
})
export class CommonuiModule {}
