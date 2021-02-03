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
  defaultImage =
    'http://127.0.0.1:8000/media/uploads/product/images/prod-img500x500.png';
  prodCartArray = [];

  constructor(private wishlist: WishlistService,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  addToCart(prod) {
    this.prodCartArray = [];
    var existingCart = JSON.parse(localStorage.getItem('prodCartArray'));
    if (existingCart != null) {
      existingCart.forEach((element) => {
        this.prodCartArray.push(element);
      });
    }
    this.prodCartArray.push(prod);
    console.log(prod);
    localStorage.setItem('prodCartArray', JSON.stringify(this.prodCartArray));

    console.log(localStorage.getItem('prodCartArray'));
  }

  addToWishlist(prod_id) {
    this.wishlist.addTowishlist(prod_id).subscribe(item => {
      this.openSnackBar('Added to wishlist successfuly!', 'OK');
    })
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
