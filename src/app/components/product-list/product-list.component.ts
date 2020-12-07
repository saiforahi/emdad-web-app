import { Component, OnInit } from '@angular/core';
import { GetProductService } from '../../shared/services/get-product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products;

  constructor(
    private getProduct: GetProductService
  ) { }

  ngOnInit(): void {
    this.getProduct.product().subscribe(item=>{
      console.log(item.data[0][0])
      this.products = item;
    })
  }

}
