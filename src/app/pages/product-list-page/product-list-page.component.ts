import { Component, HostListener, OnInit } from '@angular/core';
import { GetProductService } from '../../shared/services/get-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoryService } from '../../shared/services/get-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  categoryId;
  prevParam;
  prodInRow6;
  panelOpenState = true;
  categories: any;
  expandedCat;
  expandedSubCat;
  sellerCat = [
    {"cat_name": "cat 3", "id": 2},
    {"cat_name": "cat 6", "id": 3},
    {"cat_name": "cat 4", "id": 4},
    {"cat_name": "cat 2", "id": 5}
  ]

  constructor(
    private getProduct: GetProductService,
    private router: Router,
    private route: ActivatedRoute,
    private getCategories: GetCategoryService,
    private snackBar: MatSnackBar,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (this.router.url.split('/').length > 2) {
      this.prodInRow6 = false;
    }
    this.getCategories.category().subscribe((item) => {
      console.log(item);
      this.categories = item;
    });
    this.sellerId = this.route.snapshot.params['id'];
    this.categoryId = this.route.snapshot.params['id'];
    this.expandedCat = parseInt(localStorage.getItem("expandedCat"));
    this.expandedSubCat = parseInt(localStorage.getItem("expandedSubCat"));
    // check for is seller ==>
    const getUrlStr = this.router.url;
    const newstr = getUrlStr.substr(10, 6);
    this.isSeller = newstr == 'seller' ? true : false;
    // <==
    // if its not the seller-page then its the category page
    if (this.isSeller == true) {
      // get product by seller
      this.getProduct.getProductBySeller(this.sellerId).subscribe((item) => {
        this.products = item.data.results;
        this.nextBatchProdLink = item.data.links.next;
      });
    }else {
      // get product by category
      this.getProduct.getProductByCategory(this.categoryId).subscribe((item) => {
        this.products = item.data.results;
        this.nextBatchProdLink = item.data.links.next;
      });
    }
  }

  getProdOnFilter(ChildCatId, subCatId, catId) {
    this.router.navigate(['/products/category/', ChildCatId]);
    localStorage.setItem("expandedSubCat", subCatId);
    localStorage.setItem("expandedCat", catId);
  }

  getNextBatchproduct() {
    if (this.nextBatchProdLink != null) {
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
      this.openSnackBar('No more product to show!', 'OK');
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // @HostListener('window:scroll')
  // onWindowScroll() {
  //   //In chrome and some browser scroll is given to body tag
  //   let pos =
  //     (document.documentElement.scrollTop || document.body.scrollTop) +
  //     document.documentElement.offsetHeight;
  //   let max = document.documentElement.scrollHeight;
  //   // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
  //   if (pos >= max - 1 && this.nextBatchProdLink != null) {
  //     //Do your action here
  //     console.log('reached bootm');
  //     this.getProduct
  //       .getNextBatchProduct(this.nextBatchProdLink)
  //       .subscribe((item) => {
  //         this.products = [...this.products, ...item.data.results];
  //         this.nextBatchProdLink = item.data.links.next;
  //       });
  //   }
  //   if (this.nextBatchProdLink == null) {
  //     this.prodEnd = true;
  //   }
  // }
}
