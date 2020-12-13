import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../shared/services/user-auth.service';
import { AddProductService } from '../../shared/services/add-product.service';

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
    this.authService.getUser(uid).subscribe(
      (data) => {
        this.userId = data.data.id;
        // console.log(this.userId);
      },
      (err) => console.error(err)
    );
  }

  addProduct(formProductData: any) {
    this.productData = formProductData.value;
    // console.log('### from add-product-page ###');
    console.log(this.productData);
    // submit the form data
    this.addProductService.addProduct(this.productData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
