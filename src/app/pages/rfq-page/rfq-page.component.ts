import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../shared/services/get-product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { QuotationService } from '../../shared/services/quotation.service';

@Component({
  selector: 'app-rfq-page',
  templateUrl: './rfq-page.component.html',
  styleUrls: ['./rfq-page.component.css'],
})
export class RfqPageComponent implements OnInit {
  productData: any = { seller: {} }; // this weird initialization is for error handling :(
  image: any = null;
  submitted = false;

  rfqForm = this.formBuilder.group({
    product: '',
    buyer: '',
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: '',
    seller: '',
    quantity: new FormControl('', Validators.required),
    quotation: this.formBuilder.array([
      this.formBuilder.group({
        message: '',
        user: '',
      }),
    ]),
    rfq: { status: 1 },
  });

  constructor(
    private getProduct: GetProductService,
    private formBuilder: FormBuilder,
    private quotationService: QuotationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.getProduct.productDetailsData === undefined)
      this.router.navigate(['/']);

    let uid = localStorage.getItem('uid');

    this.getProduct.productDetailsData.subscribe((item) => {
      this.productData = item.data[0];
      if (this.productData.image1) this.image = this.productData.image1;
      else this.image = this.productData.image2;

      this.rfqForm.patchValue({ product: this.productData.id });
      this.rfqForm.patchValue({ buyer: uid });
      this.rfqForm.patchValue({ seller: this.productData.seller.id });
      this.rfqForm.patchValue({ quotation: [{ message: '', user: uid }] });
    });
  }

  onSubmit() {
    // console.log(this.rfqForm.value);
    this.submitted = true;
    if (
      this.rfqForm.get('email').errors == null &&
      this.rfqForm.get('phone').errors == null &&
      this.rfqForm.get('quantity').errors == null
    ) {
      this.quotationService.createQuotation(this.rfqForm.value).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/']);
        },
        (err) => console.error(err)
      );
    }
  }
}
