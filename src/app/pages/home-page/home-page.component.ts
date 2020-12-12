import { Component, HostListener, Input, OnInit } from '@angular/core';
import { GetProductService } from '../../shared/services/get-product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  products;
  nextBatchProdLink;
  prodEnd = false;

  constructor(
    private getProduct: GetProductService
  ) { }

  ngOnInit(): void {
    this.getProduct.product().subscribe(item => {
      this.products = item.data.results;
      this.nextBatchProdLink = item.data.links.next;
      console.log(item)
    })
  }

  @HostListener("window:scroll")
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if ((pos >= max-1) && (this.nextBatchProdLink != null)) {
      //Do your action here
      console.log("reached bootm");
      this.getProduct.getNextBatchProduct(this.nextBatchProdLink).subscribe(item => {
          this.products = [...this.products, ...item.data.results];
          this.nextBatchProdLink = item.data.links.next;
      })
    }
    if(this.nextBatchProdLink == null){
      this.prodEnd = true;
    }
  }

}
