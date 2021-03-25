import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { GetProductService } from '../../../shared/services/get-product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerReviewService } from 'src/app/shared/services/customer-review.service';
import { ViewportScroller } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
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
  relatedProducts: any;
  totalComments = 0;
  commentlist = [];
  nextCommentsLink = null;
  addToWishlistStatus: string = '0';
  screenWidth: number;
  sliderClassName: string;
  itemToshow;
  sliceMinValue: number;
  sliceMaxValue: number;

  constructor(
    private getProduct: GetProductService,
    private route: ActivatedRoute,
    private wishlist: WishlistService,
    private snackBar: MatSnackBar,
    private comments: CustomerReviewService,
    private viewportScroller: ViewportScroller,
    private cart: CartServiceService,
    private spinner: NgxSpinnerService
  ) {
    this.getScreenSize();
  }

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
      // console.log(this.prodcutDetails);
      this.getProduct
        .getProductByCategory(this.prodcutDetails.category.id)
        .subscribe((item) => {
          this.relatedProducts = item.data.results;
          // console.log('prod list:' ,this.relatedProducts)
        });
      // this.comments
      //   .getComments(this.prodcutDetails.id)
      //   .subscribe((item: any) => {
      //     this.commentlist = [...this.commentlist, ...item.data.results];
      //     // alert(JSON.stringify(this.commentlist));
      //     if (item.data.links.next === null) this.commnetsEnd = true;
      //     // console.log(this.commentlist);
      //   });
      this.loadTotalCommentsCount();
      this.loadComments();
      this.wishlist
        .wishlistStatusCheck(this.productId)
        .subscribe((data: any) => {
          this.addToWishlistStatus = data.status;
          // alert(this.addToWishlistStatus);
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
    var existingCartLength = 0;
    var foundSameProduct = false;

    if (existingCart != null) {
      existingCartLength = existingCart.length;
      existingCart.forEach((element) => {
        if (element.id != this.prodcutDetails.id) {
          this.prodCartArray.push(element);
        } else foundSameProduct = true;
      });
    }
    // if product details available only then add to it in the cart array
    if (this.prodcutDetails && !foundSameProduct) {
      this.prodcutDetails.cart_qty = 1;
      this.prodCartArray.push(this.prodcutDetails);
      this.cart.existingCartLength.next(existingCartLength + 1);
      localStorage.setItem('prodCartArray', JSON.stringify(this.prodCartArray));
      this.openSnackBar('Product added to cart!', 'OK');
    } else {
      this.openSnackBar('Product alreay in cart!', 'OK');
    }
  }

  show_review_modal() {
    document.getElementById('prodReviewModal').style.display = 'block';
  }

  loadTotalCommentsCount() {
    this.comments.getAllComments(this.productId).subscribe((item) => {
      this.totalComments = item.total;
    });
  }

  loadComments() {
    this.commentlist = [];
    this.comments.getComments(this.prodcutDetails.id).subscribe((item: any) => {
      this.commentlist = [...item.data.results, ...this.commentlist];
      // alert(JSON.stringify(this.commentlist));
      this.nextCommentsLink = item.data.links.next;
      this.loadTotalCommentsCount();
      // console.log(this.commentlist);
    });
  }

  getNextComments() {
    this.spinner.show();
    if (this.nextCommentsLink !== null) {
      this.comments
        .getNextComments(this.nextCommentsLink)
        .subscribe((comments) => {
          this.commentlist = [...this.commentlist, ...comments.data.results];
          this.nextCommentsLink = comments.data.links.next;
          this.spinner.hide();
        });
    }
  }

  onNewCommentAdd(event) {
    if (event == '1') this.loadComments();
    // else console.log('$$$$$');
  }

  addToWishlist(prod_id) {
    this.wishlist.addTowishlist(prod_id).subscribe((item) => {
      this.openSnackBar('Added to wishlist successfuly!', 'OK');
      this.addToWishlistStatus = '0';
    });
  }

  removeFromWishlist(prod_id) {
    this.wishlist.removeFromWishllist(prod_id).subscribe((item) => {
      this.openSnackBar('Successfully removed from wishlist!', 'OK');
      this.addToWishlistStatus = '1';
    });
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  get_quantity(value) {
    if (parseInt(value) > 0) {
      return parseInt(value);
    } else {
      return 0;
    }
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
    // console.log(this.screenWidth);
    if(this.screenWidth >= 300 && this.screenWidth <= 575){
      this.sliderClassName = 'col-6';
      this.itemToshow = 2;
      this.sliceMinValue = 0;
      this.sliceMaxValue = 2;
      // console.log(this.sliceMinValue, this.sliceMaxValue);
    }else if(this.screenWidth >= 576 && this.screenWidth <= 767){
      this.sliderClassName = 'col-sm-4';
      this.itemToshow = 3;
      this.sliceMinValue = 0;
      this.sliceMaxValue = 3;
      // console.log(this.sliceMinValue, this.sliceMaxValue);
    }else if(this.screenWidth >= 768 && this.screenWidth <= 991){
      this.sliderClassName = 'col-md-3';
      this.itemToshow = 4;
      this.sliceMinValue = 0;
      this.sliceMaxValue = 4;
      // console.log(this.sliceMinValue, this.sliceMaxValue);
    }else if(this.screenWidth >= 992){
      this.sliderClassName = 'col-lg-2';
      this.itemToshow = 6;
      this.sliceMinValue = 0;
      this.sliceMaxValue = 6;
      // console.log(this.sliceMinValue, this.sliceMaxValue);
    }
  }

  nextSlide(){
    // console.log(this.sliceMinValue, this.sliceMaxValue, this.relatedProducts.length);
    if(this.sliceMaxValue < this.relatedProducts.length){
      this.sliceMinValue = this.sliceMinValue + this.itemToshow;
      this.sliceMaxValue = this.sliceMaxValue + this.itemToshow;
      // console.log(this.sliceMinValue, this.sliceMaxValue);
    }
  }

  prevSlide(){
    // console.log(this.sliceMinValue, this.sliceMaxValue, this.relatedProducts.length);
    if(this.sliceMinValue > 0){
      this.sliceMinValue = this.sliceMinValue - this.itemToshow;
      this.sliceMaxValue = this.sliceMaxValue - this.itemToshow;
      // console.log(this.sliceMinValue, this.sliceMaxValue);
    }
  }
}
