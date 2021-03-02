import { Component, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-card-horizonal',
  templateUrl: './product-card-horizonal.component.html',
  styleUrls: ['./product-card-horizonal.component.css']
})
export class ProductCardHorizonalComponent implements OnInit {
  @Input() product;
  defaultImage = '../assets/images/default-image-620x600.jpg';
  prodCartArray = [];
  userId;

  constructor(
    private wishlist: WishlistService,
    private snackBar: MatSnackBar,
    private user:UserAuthService
  ) {}

  ngOnInit(): void {
    // console.log(this.product)
    this.user.uId.subscribe(item =>{
      this.userId = item;
    })
    console.log(this.product)
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
    this.openSnackBar('Added to Cart','OK')
  }

  addToWishlist(prod_id) {
    if(this.userId){
      this.wishlist.addTowishlist(prod_id).subscribe((item: any) => {
        this.openSnackBar(item.message, 'OK');
      });
    }else {
      document.getElementById('buyerLogin').style.display = 'block';
    }
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
