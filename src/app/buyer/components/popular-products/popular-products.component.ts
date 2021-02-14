import { Component, Input, OnInit } from '@angular/core';
import { GetProductService } from '../../../shared/services/get-product.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css'],
})
export class PopularProductsComponent implements OnInit {
  defaultImage =
    'http://127.0.0.1:8000/media/uploads/product/images/prod-img500x500.png';
  popularProducts: any;

  constructor(private getProducts: GetProductService) {}

  ngOnInit(): void {
    this.getProducts.popularProduct().subscribe(item =>{
      console.log(item)
      this.popularProducts = item.data.results;
    })
  }

  addToWishlist(e) {
    // e.preventdefault();
  }
}
