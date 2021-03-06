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
import { BuyerSigninFormComponent } from 'src/app/buyer/components/buyer-login-modal-form/buyer-login-modal-form.component';
import { BuyerRegistrationFormComponent } from 'src/app/buyer/components/buyer-registration-modal-form/buyer-Registration-modal-form.component';
import { FooterComponent } from 'src/app/buyer/components/footer/footer.component';
import { FormInputAlertComponent } from 'src/app/seller/components/form-input-alert/form-input-alert.component';
import { SellerBreadcrumbsComponent } from 'src/app/seller/components/seller-breadcrumbs/seller-breadcrumbs.component';
import {ProductCardHorizonalComponent} from '../../buyer/components/product-card-horizonal/product-card-horizonal.component';
import {RfqModalProductDescriptionComponent} from '../../seller/components/rfq-modal-product-description/rfq-modal-product-description.component';
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
  RfqModalProductDescriptionComponent
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
  ],
  exports: [UI],
})
export class CommonuiModule {}
