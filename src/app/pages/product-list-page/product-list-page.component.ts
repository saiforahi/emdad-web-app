import { Component, HostListener, OnInit } from '@angular/core';
import { GetProductService } from '../../shared/services/get-product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css'],
})
export class ProductListPageComponent implements OnInit {
  sellerId;
  isSeller = false;
  products = [];
  prodEnd;
  nextBatchProdLink;
  isCategory = false;
  categoryId;
  prevParam;

  constructor(
    private getProduct: GetProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.sellerId = this.route.snapshot.params['id'];
    this.categoryId = this.route.snapshot.params['id'];
    // check for is seller ==>
    const getUrlStr = this.router.url;
    const newstr = getUrlStr.substr(10, 6);
    this.isSeller = newstr == 'seller' ? true : false;
    // <==
    // if its not the seller-page then its the category page
    if (this.isSeller == false) this.isCategory = true;

    // get product by seller
    this.getProduct.getProductBySeller(this.sellerId).subscribe((item) => {
      this.products = item.data.results;
      this.nextBatchProdLink = item.data.links.next;
      // console.log(this.products);
    });

    // get product by category
    this.getProduct.getProductByCategory(this.categoryId).subscribe((item) => {
      console.log(item);
      this.products = item.data.results;
      this.nextBatchProdLink = item.data.links.next;
      console.log(this.products);
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos >= max - 1 && this.nextBatchProdLink != null) {
      //Do your action here
      console.log('reached bootm');
      this.getProduct
        .getNextBatchProduct(this.nextBatchProdLink)
        .subscribe((item) => {
          this.products = [...this.products, ...item.data.results];
          this.nextBatchProdLink = item.data.links.next;
        });
    }
    if (this.nextBatchProdLink == null) {
      this.prodEnd = true;
    }
  }
}
