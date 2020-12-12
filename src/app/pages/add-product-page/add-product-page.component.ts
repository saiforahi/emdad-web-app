import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../shared/services/user-auth.service';
import { GetCategoryService } from '../../shared/services/get-category.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css'],
})
export class AddProductPageComponent implements OnInit {
  userId: any;
  productData: any;
  categories: any;

  constructor(private authService: UserAuthService, private router: Router) {}

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
    this.productData = formProductData;
    // console.log('### from add-product-page ###');
    // console.log(this.productData);
  }
}
