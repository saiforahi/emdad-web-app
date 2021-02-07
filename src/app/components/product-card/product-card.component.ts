import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../shared/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  defaultImage = '../assets/images/default-image-620x600.jpg';
  prodCartArray = [];

  constructor(
    private wishlist: WishlistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // console.log(this.product)
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
    this.wishlist.addTowishlist(prod_id).subscribe((item: any) => {
      this.openSnackBar(item.message, 'OK');
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
}
