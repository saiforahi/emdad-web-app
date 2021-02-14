import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { AddProductService } from '../../../shared/services/add-product.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css'],
})
export class AddProductPageComponent implements OnInit {
  userId: any;
  productData: any;
  categories: any;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private addProductService: AddProductService
  ) {}

  ngOnInit(): void {
    var uid = localStorage.getItem('uid');
    this.userId = uid;
  }

  addProduct(formProductData: any) {
    // this.productData = formProductData.value;
    console.log(formProductData);
    // creating formData
    this.productData = new FormData();
    this.productData.append('name', formProductData.name);
    this.productData.append('slug', formProductData.slug);
    this.productData.append('description', formProductData.description);
    this.productData.append('category', formProductData.category);
    this.productData.append('unit_price', formProductData.unit_price);
    this.productData.append('delivery_method', formProductData.delivery_method);
    this.productData.append('ddp_lead_time', formProductData.ddp_lead_time);
    this.productData.append(
      'ex_works_lead_time',
      formProductData.ex_works_lead_time
    );
    this.productData.append('commission', formProductData.commission);
    this.productData.append('stock_quantity', formProductData.stock_quantity);
    this.productData.append('unit', formProductData.unit);
    this.productData.append('color', formProductData.color);
    this.productData.append('brand_id', formProductData.brand_id);
    this.productData.append('seller', formProductData.seller);
    if (formProductData.image1)
      this.productData.append(
        'image1',
        formProductData.image1,
        formProductData.image1.name
      );
    if (formProductData.image2)
      this.productData.append(
        'image2',
        formProductData.image2,
        formProductData.image2.name
      );
    this.productData.append('status', formProductData.status);
    for (var i = 0; i < formProductData.attachment.length; i++) {
      this.productData.append(
        `attachment[${i}]path`,
        formProductData.attachment[i],
        formProductData.attachment[i].name
      );
    }
    // submit the form data
    this.addProductService.addProduct(this.productData).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/']);
      },
      (err) => console.log(err)
    );
  }
}
