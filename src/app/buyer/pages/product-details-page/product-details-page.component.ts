import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { GetProductService } from '../../../shared/services/get-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerReviewService } from 'src/app/shared/services/customer-review.service';
import { ViewportScroller } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { config } from 'src/config';
import { CartServiceService } from 'src/app/shared/services/cart-service.service';
import {Product} from '../../../shared/models/Product.model'
import { Cart } from 'src/app/shared/models/Cart.model';
@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {
  productId;
  prodcutDetails;
  sliderImgArray;
  currentImg = 0;
  nextBtnDisabled: boolean = false;
  prevBtnDisabled: boolean = true;
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
  activeRoute: string[];
  commnetsEnd: boolean;

  constructor(
    private getProduct: GetProductService,
    private route: ActivatedRoute,
    private wishlist: WishlistService,
    private snackBar: MatSnackBar,
    private comments: CustomerReviewService,
    private viewportScroller: ViewportScroller,
    private cartService: CartServiceService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) {
    this.getScreenSize();
    router.events.subscribe((val: any) => {
      if (val.url) {
        this.activeRoute = val.url.split('/');
        if(this.activeRoute[2] == 'details'){
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activeRoute = this.router.url.split('/');
    this.productId = this.route.snapshot.params['id'];
    this.getProduct.productDetails(this.productId).subscribe((item) => {
      this.prodcutDetails = item.data[0];
      this.sliderImgArray = [
        config.img_base_url +
          item.data[0].image1,
        config.img_base_url +
          item.data[0].image2,
      ];
      console.log(this.prodcutDetails);
      this.getProduct
        .getProductByCategory(this.prodcutDetails.category.id)
        .subscribe((item) => {
          this.relatedProducts = item.data.results;
          // console.log('prod list:' ,this.relatedProducts)
        });
      this.comments
        .getComments(this.prodcutDetails.id)
        .subscribe((item: any) => {
          this.commentlist = item.data.results;
          this.nextCommentsLink = item.data.links.next;
          // alert(JSON.stringify(this.commentlist));
          if (this.nextCommentsLink == null) {
            this.commnetsEnd = true;
          }
        });
      this.wishlist
        .wishlistStatusCheck(this.productId)
        .subscribe((data: any) => {
          this.addToWishlistStatus = data.status;
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
  add_to_cart(){
    console.log('product details',this.prodcutDetails)
    let existingCart:Cart = JSON.parse(localStorage.getItem('cart')); //fetching existing cart from local storage
    let existingCartLength:number=0; //initializing number of products in 
    var foundSameProduct:boolean = false;
    if(existingCart===null){
      existingCart=new Cart() //initializing cart object if it's the first attempt to add to cart
    }
    console.log('cart',existingCart)
    if(existingCart?.products?.length>0){
      existingCartLength=existingCart.products.length
      existingCart.products.forEach((element) => {
        if (element.id == this.prodcutDetails.id) {
          foundSameProduct = true;
        }
      });
    }
    if (this.prodcutDetails && !foundSameProduct) {
      this.prodcutDetails.cart_qty = 1;
      existingCart.products.push(this.prodcutDetails);
      this.cartService.existingCartLength.next(existingCartLength + 1);
      console.log('cart',existingCart)
      localStorage.setItem('cart', JSON.stringify(existingCart));
      this.openSnackBar('Product added to cart!', 'OK');
    } else {
      this.openSnackBar('Product alreay in cart!', 'OK');
    }
  }
  // addToCart() {
  //   this.prodCartArray = [];
  //   var existingCart:Cart = JSON.parse(localStorage.getItem('cart'));
  //   var existingCartLength = 0;
  //   var foundSameProduct = false;

  //   if (existingCart != null) {
  //     existingCartLength = existingCart.products.length;
  //     existingCart.products.forEach((element) => {
  //       if (element.id != this.prodcutDetails.id) {
  //         this.prodCartArray.push(element);
  //       } else foundSameProduct = true;
  //     });
  //   }
  //   // if product details available only then add to it in the cartService array
  //   if (this.prodcutDetails && !foundSameProduct) {
  //     this.prodcutDetails.cart_qty = 1;
  //     this.prodCartArray.push(this.prodcutDetails);
  //     this.cartService.existingCartLength.next(existingCartLength + 1);
  //     console.log('cartService')
  //     localStorage.setItem('prodCartArray', JSON.stringify(this.prodCartArray));
  //     this.openSnackBar('Product added to cart!', 'OK');
  //   } else {
  //     this.openSnackBar('Product alreay in cart!', 'OK');
  //   }
  // }

  show_review_modal() {
    document.getElementById('prodReviewModal').style.display = 'block';
  }

  getNextComments() {
    // this.spinner.show();
    if (this.nextCommentsLink !== null) {
      this.comments
        .getNextComments(this.nextCommentsLink)
        .subscribe((comments) => {
          this.commentlist = [...this.commentlist, ...comments.data.results];
          this.nextCommentsLink = comments.data.links.next;
          // this.spinner.hide();
        });
    }
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

  get_unit_price(product_commission:any,price:any){ //generating unit price with commission
    let total=0
    if(parseFloat(product_commission)>0){
      let unit_price=parseFloat(price)* (parseFloat(product_commission) / 100)
      total = unit_price + parseFloat(price)
      //console.log('if total',total)
      //console.log('unit price',(parseFloat(unit_price) * (product_commission / 100))+parseFloat(unit_price))
      //return (parseFloat(unit_price) * (product_commission / 100))+parseFloat(unit_price)
    }
    else{
      
      let unit_price=parseFloat(price)* (parseFloat(localStorage.getItem('commission')) / 100)
      total = unit_price + parseFloat(price)
      //console.log('else total',total)
    }
    return total.toFixed(2)
  }
}
