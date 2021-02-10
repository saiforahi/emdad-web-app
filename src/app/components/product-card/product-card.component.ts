import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../shared/services/wishlist.service';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  defaultImage = '../assets/images/default-image-620x600.jpg';
  prodCartArray = [];
  userId;

  constructor(
    private wishlist: WishlistService,
    private snackBar: MatSnackBar,
    private user: UserAuthService
  ) {}

  ngOnInit(): void {
    // console.log(this.product)
    this.user.uId.subscribe((item) => {
      this.userId = item;
    });
  }

  addToCart(prod) {
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
    if (url.includes('http://182.160.97.250:8002')) {
      // console.log(url.slice(21));
      return url.slice(21);
    } else {
      // console.log(url);
      return url;
    }
  }
}
