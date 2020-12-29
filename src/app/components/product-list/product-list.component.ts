import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products = [];
  @Input() prodEnd;
  defaultImage = "http://127.0.0.1:8000/media/uploads/product/images/prod-img500x500.png";

  constructor() { }

  ngOnInit(): void {
    console.log(this.products)
  }

}
