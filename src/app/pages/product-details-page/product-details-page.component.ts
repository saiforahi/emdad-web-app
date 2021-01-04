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

  constructor(
    private getProduct:GetProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProduct.productDetails(this.productId).subscribe(item => {
      this.prodcutDetails = item.data[0];
      this.sliderImgArray = ['http://127.0.0.1:8002'+item.data[0].image1, 'http://127.0.0.1:8002'+item.data[0].image2];
      console.log(this.prodcutDetails);
    })
  }

}
