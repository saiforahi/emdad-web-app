import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() products = [];
  @Input() prodEnd;
  @Input() prodInRow6;
  @Input() view_style;
  /* @Input() directoryString = ''; */
  constructor() { }

  ngOnInit(): void {
    console.log(this.products)
    //this.view_style='grid'
    if(this.view_style!=='grid' && this.view_style!=='list'){
      this.view_style='grid'
    }
  }

}
