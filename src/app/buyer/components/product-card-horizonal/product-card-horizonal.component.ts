import { Component, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { GetProductService } from '../../../shared/services/get-product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { config } from 'src/config';
import { CartServiceService } from 'src/app/shared/services/cart-service.service';
@Component({
  selector: 'app-product-card-horizonal',
  templateUrl: './product-card-horizonal.component.html',
  styleUrls: ['./product-card-horizonal.component.css'],
})
export class ProductCardHorizonalComponent implements OnInit {
  @Input() product;
  defaultImage = '../assets/images/default-image-620x600.jpg';
  prodCartArray = [];
  prod_qty: number;
  userId;
  img_base_url = config.img_base_url;
  
  constructor(
    private wishlist: WishlistService,
    private snackBar: MatSnackBar,
    private user: UserAuthService,
    private ProductService: GetProductService,
    private router: Router,
    private cart: CartServiceService
  ) {}

  ngOnInit(): void {
    // console.log(this.product)
    this.user.uId.subscribe((item) => {
      this.userId = item;
    });
    console.log(this.product);
  }

  addToCart(prod) {
    if(this.prod_qty>0){
      prod.cart_qty = this.prod_qty > 0 ? this.prod_qty : 1;
      this.prodCartArray = [];
      var existingCart = JSON.parse(localStorage.getItem('prodCartArray'));
      if (existingCart != null) {
        //this.cart.existingCartLength.next(existingCart.length + 1);
        existingCart.forEach((element) => {
          if(prod.id!=element.id){
            this.prodCartArray.push(element);
          }
          else{
            console.log('cart matched product',prod)
            //console.log('qty',parseInt(element.cart_qty)+parseInt(prod.cart_qty))
            prod.cart_qty=parseInt(element.cart_qty)+parseInt(prod.cart_qty)
          }
        });
      }
      this.prodCartArray.push(prod);
      localStorage.setItem('prodCartArray', JSON.stringify(this.prodCartArray));
      this.prod_qty=0
      this.openSnackBar('Added to Cart', 'OK');
    }
    else{
      this.prod_qty=0
      this.openSnackBar('Invalid Quantity', 'OK');
    }
  }

  addToWishlist(prod_id) {
    if (this.userId) {
      this.wishlist.addTowishlist(prod_id).subscribe((item: any) => {
        this.openSnackBar(item.message, 'OK');
      });
    } else {
      document.getElementById('buyerLogin').style.display = 'block';
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  slice_image_url(url: string) {
    if (url.includes(this.img_base_url)) {
      // console.log(url.slice(21));
      return url.slice(21);
    } else {
      // console.log(url);
      return url;
    }
  }
  go_to_rfq() {
    console.log('id', this.product.id);
    this.ProductService.productDetails(this.product.id).subscribe(
      (response) => {
        this.router.navigate(['/rfq/']);
      }
    );
  }
}
