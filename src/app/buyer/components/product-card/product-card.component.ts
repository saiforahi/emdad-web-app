import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { config } from 'src/config';
import {CommissionService} from '../../../shared/services/commission.services'
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  /* @Input() directoryString = ''; */
  defaultImage = '../assets/images/default-image-620x600.jpg';
  base_url = config.base_url;
  prodCartArray = [];
  userId;

  constructor(
    private wishlist: WishlistService,
    private snackBar: MatSnackBar,
    private user: UserAuthService,
    private commission:CommissionService
  ) {}

  ngOnInit(): void {
    // console.log(this.product);
    this.user.uId.subscribe((item) => {
      this.userId = item;
    });
    this.wishlist
      .wishlistStatusCheck(this.product.id)
      .subscribe((data: any) => {
        // console.log(data)
        if (data.status == 1) {
          this.product.wishListStatus = 0;
        } else {
          this.product.wishListStatus = 1;
        }
      });
  }

  addToCart(prod) { //backdated approach
    this.prodCartArray = [];
    var existingCart = JSON.parse(localStorage.getItem('prodCartArray'));
    if (existingCart != null) {
      existingCart.forEach((element) => {
        this.prodCartArray.push(element);
      });
    }
    this.prodCartArray.push(prod);
    // console.log(prod);
    localStorage.setItem('prodCartArray', JSON.stringify(this.prodCartArray));
  }

  addToWishlist(prod_id) {
    if (this.userId) {
      this.wishlist.addTowishlist(prod_id).subscribe((item: any) => {
        this.openSnackBar(item.message, 'OK');
        this.ngOnInit();
      });
    } else {
      document.getElementById('buyerLogin').style.display = 'block';
    }
  }

  removeFromWishlist(prod_id) {
    this.wishlist.removeFromWishllist(prod_id).subscribe((item) => {
      this.openSnackBar('Successfully removed from wishlist!', 'OK');
      /* this.ngOnInit(); */
      window.location.reload();
    });
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  slice_image_url(url: string) {
    if (url.includes('http://127.0.0.1:8000')) {
      // console.log(url.slice(21));
      return url.slice(21);
    } else {
      // console.log(url);
      return url;
    }
  }

  get_unit_price(product_commission:any,price:any){ //generating unit price with commission
    let total=0
    if(parseFloat(product_commission)>0){
      let unit_price=parseFloat(price)* (parseFloat(product_commission) / 100)
      total = unit_price + parseFloat(price)
      //console.log('if total',total)
      //console.log('unit price',(parseFloat(unit_price) * (product_commission / 100))+parseFloat(unit_price))
      //return (parseFloat(unit_price) * (product_commission / 100))+parseFloat(unit_price)
    }
    else{
      
      let unit_price=parseFloat(price)* (parseFloat(localStorage.getItem('commission')) / 100)
      total = unit_price + parseFloat(price)
      // console.log('else total',total)
    }
    return (total+(total*(parseFloat(localStorage.getItem('vat'))/100))).toFixed(2)
  }
}
