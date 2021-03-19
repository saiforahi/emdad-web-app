import { Component, OnInit, ViewChild } from '@angular/core';
import { GetProductService } from '../../../shared/services/get-product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerReviewService } from 'src/app/shared/services/customer-review.service';
import { ViewportScroller } from '@angular/common';
import { config } from 'src/config';
import { CartServiceService } from 'src/app/shared/services/cart-service.service';
@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css'],
  providers: [NgbCarouselConfig],
})
export class ProductDetailsPageComponent implements OnInit {
  productId;
  prodcutDetails;
  sliderImgArray;
  prodCartArray: any[];
  currentImg = 0;
  nextBtnDisabled: boolean = false;
  prevBtnDisabled: boolean = true;
  showNavigationArrows = true;
  showNavigationIndicators = false;
  images = [
    '../../../assets/review-icon.svg',
    '../../../assets/review-icon.svg',
    '../../../assets/review-icon.svg',
  ];
  carousel: any;
  relatedProducts: any;
  commentlist: any;
  commnetsEnd: boolean = false;

  constructor(
    private getProduct: GetProductService,
    private route: ActivatedRoute,
    private wishlist: WishlistService,
    private snackBar: MatSnackBar,
    private comments: CustomerReviewService,
    private viewportScroller: ViewportScroller,
    private cart: CartServiceService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.productId = this.route.snapshot.params['id'];
    this.getProduct.productDetails(this.productId).subscribe((item) => {
      this.prodcutDetails = item.data[0];
      this.sliderImgArray = [
        config.base_url.substring(0, config.base_url.length - 1) +
          item.data[0].image1,
        config.base_url.substring(0, config.base_url.length - 1) +
          item.data[0].image2,
      ];
      console.log(this.prodcutDetails);
      this.getProduct
        .getProductByCategory(this.prodcutDetails.category.id)
        .subscribe((item) => {
          this.relatedProducts = item.data.results;
          // console.log('prod list:' ,this.relatedProducts)
        });
      this.comments.getComments(this.prodcutDetails.id).subscribe((item) => {
        this.commentlist = item;
        // alert(JSON.stringify(this.commentlist));
        if (this.commentlist.data.links.next === null) this.commnetsEnd = true;
        // console.log(this.commentlist);
      });
    });
  }
  scroll_to_reviews(element_id: string) {
    this.viewportScroller.scrollToAnchor(element_id);
  }
  nextImg() {
    if (this.currentImg <= this.sliderImgArray.length - 1) {
      this.currentImg++;
      this.prevBtnDisabled = false;
    }
    if (this.currentImg == this.sliderImgArray.length - 1) {
      this.nextBtnDisabled = true;
    }
  }

  prevImg() {
    if (this.currentImg > 0) {
      this.currentImg--;
      this.nextBtnDisabled = false;
    }
    if (this.currentImg == 0) {
      this.prevBtnDisabled = true;
    }
  }

  addToCart() {
    this.prodCartArray = [];
    var existingCart = JSON.parse(localStorage.getItem('prodCartArray'));
    if (existingCart != null) {
      this.cart.existingCartLength.next(existingCart.length + 1);
      existingCart.forEach((element) => {
        if (element.id !== this.prodcutDetails.id)
          this.prodCartArray.push(element);
      });
    }
    // if product details available only then add to it in the cart array
    if (this.prodcutDetails) {
      this.prodCartArray.push(this.prodcutDetails);
      // console.log('#####');
      // console.log(this.prodCartArray);
      // console.log('#####');
      localStorage.setItem('prodCartArray', JSON.stringify(this.prodCartArray));
      this.openSnackBar('Product added to cart!', 'ok');
    }
  }

  show_review_modal() {
    document.getElementById('prodReviewModal').style.display = 'block';
  }

  getNextComments() {
    if (this.commentlist.data.links.next !== null) {
      this.comments
        .getNextComments(this.commentlist.data.links.next)
        .subscribe((comments) => {
          this.commentlist = comments;
          if (this.commentlist.data.links.next === null) {
            this.commnetsEnd = true;
          }
        });
    }
  }

  addToWishlist(prod_id) {
    this.wishlist.addTowishlist(prod_id).subscribe((item) => {
      this.openSnackBar('Added to wishlist successfuly!', 'OK');
    });
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
