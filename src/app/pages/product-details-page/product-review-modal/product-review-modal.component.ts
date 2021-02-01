import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-review-modal',
  templateUrl: './product-review-modal.component.html',
  styleUrls: ['./product-review-modal.component.css']
})
export class ProductReviewModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hide_review_modal(){
    document.getElementById('prodReviewModal').style.display="none";
  }

}
