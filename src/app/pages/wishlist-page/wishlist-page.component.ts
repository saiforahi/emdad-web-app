import { Component, OnInit } from '@angular/core';
import { createUnparsedSourceFile } from 'typescript';
import { WishlistService } from '../../shared/services/wishlist.service';
import { GetProductService } from '../../shared/services/get-product.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css']
})
export class WishlistPageComponent implements OnInit {
  products = [];

  constructor(private wishlist: WishlistService, private product: GetProductService) { }

  ngOnInit(): void {
    this.wishlist.getWishlist().subscribe(item => {
      console.log(item)
      var initProducts = item.data[0];
      initProducts.forEach(element => {
        console.log(element.product)
        this.product.productDetails(element.product).subscribe(item2 => {
          this.products.push(item2.data[0]);
          console.log(item2.data[0])
        })
      });
    })
    console.log(this.products)
  }

}
