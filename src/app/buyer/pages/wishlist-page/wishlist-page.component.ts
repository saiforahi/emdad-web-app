import { Component, OnInit } from '@angular/core';
import { createUnparsedSourceFile } from 'typescript';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { GetProductService } from '../../../shared/services/get-product.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.css'],
})
export class WishlistPageComponent implements OnInit {
  products = [];
  style: string;
  nextBatchProdLink: any;
  prodEnd: boolean;

  constructor(
    private wishlist: WishlistService,
    private product: GetProductService
  ) {}

  ngOnInit(): void {
    this.style = 'grid';
    this.wishlist.getWishlist().subscribe((item) => {
      console.log(item);
      var initProducts = item.data[0];
      initProducts.forEach((element) => {
        console.log(element.product);
        this.product.productDetails(element.product.id).subscribe((item2) => {
          this.products.push(item2.data[0]);
          console.log(item2.data[0]);
        });
      });
    });
    console.log(this.products);
  }

  getNextBatchproduct() {
    if (this.nextBatchProdLink != null) {
      //Do your action here
      console.log('reached bootm');
      this.product
        .getNextBatchProduct(this.nextBatchProdLink)
        .subscribe((item) => {
          this.products = [...this.products, ...item.data.results];
          this.nextBatchProdLink = item.data.links.next;
        });
    }
    if (this.nextBatchProdLink == null) {
      this.prodEnd = true;
      // this.openSnackBar('No more product to show!', 'OK');
    }
  }

  set_style(value: string) {
    this.style = value;
  }
}
