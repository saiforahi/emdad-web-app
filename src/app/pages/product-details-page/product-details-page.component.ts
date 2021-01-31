import { Component, OnInit, ViewChild } from '@angular/core';
import { GetProductService } from '../../shared/services/get-product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
  images = ['../../../assets/review-icon.svg', '../../../assets/review-icon.svg', '../../../assets/review-icon.svg']
  carousel: any;
  relatedProducts: any;

  constructor(
    private getProduct: GetProductService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.productId = this.route.snapshot.params['id'];
    this.getProduct.productDetails(this.productId).subscribe((item) => {
      this.prodcutDetails = item.data[0];
      this.sliderImgArray = [
        'http://127.0.0.1:8000' + item.data[0].image1,
        'http://127.0.0.1:8000' + item.data[0].image2,
      ];
      // console.log(this.prodcutDetails);
      this.getProduct.getProductByCategory(this.prodcutDetails.category.id).subscribe(item => {
        this.relatedProducts = item.data.results;
        console.log('prod list:' ,this.relatedProducts)
      })
    });
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

  // nextItem(source:NgbSlideEventSource){
  //   this.carousel.next(source?: NgbSlideEventSource);
  // }

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
  }
}
