import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products = [];
  @Input() prodEnd;
  defaultImage = "http://127.0.0.1:8002/media/uploads/product/images/prod-img500x500.png";
  prodCartArray = [];

  constructor() { }

  ngOnInit(): void {
  }

  addToCart(prodId){
    this.prodCartArray = [];
    var existingCart = JSON.parse(localStorage.getItem("prodCartArray"));
    if(existingCart.length != 0){
      existingCart.forEach(element => {
        this.prodCartArray.push(element)
      });
    }
    this.prodCartArray.push(prodId);
    console.log(prodId);
    localStorage.setItem("prodCartArray", JSON.stringify(this.prodCartArray));
  }

}
