import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products = [];
  @Input() prodEnd;
  @Input() prodInRow6;

  constructor() { }

  ngOnInit(): void {
  }

}
