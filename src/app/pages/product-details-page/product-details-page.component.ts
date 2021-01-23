import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../shared/services/get-product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.css']
})
export class ProductDetailsPageComponent implements OnInit {

  productId;
  prodcutDetails;
  sliderImgArray;
  prodCartArray: any[];

  constructor(
    private getProduct:GetProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.productId = this.route.snapshot.params['id'];
    this.getProduct.productDetails(this.productId).subscribe(item => {
      this.prodcutDetails = item.data[0];
      this.sliderImgArray = ['http://127.0.0.1:8000'+item.data[0].image1, 'http://127.0.0.1:8000'+item.data[0].image2];
      console.log(this.prodcutDetails);
    })
  }

  addToCart(prod){
    this.prodCartArray = [];
    var existingCart = JSON.parse(localStorage.getItem("prodCartArray"));
    if(existingCart != null){
      existingCart.forEach(element => {
        this.prodCartArray.push(element)
      });
    }
    this.prodCartArray.push(prod);
    console.log(prod);
    localStorage.setItem("prodCartArray", JSON.stringify(this.prodCartArray));
  }

}
