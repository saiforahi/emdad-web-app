import { Component, Input, OnInit } from '@angular/core';
import { CustomerReviewService } from 'src/app/shared/services/customer-review.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-product-review-modal',
  templateUrl: './product-review-modal.component.html',
  styleUrls: ['./product-review-modal.component.css']
})
export class ProductReviewModalComponent implements OnInit {
  @Input() prodcutDetails;
  userId: any;

  constructor(
    private comments: CustomerReviewService,
    private user: UserAuthService) { }

  ngOnInit(): void {
    this.user.uId.subscribe(item => {
      this.userId = item;
    })
  }

  hide_review_modal(){
    document.getElementById('prodReviewModal').style.display="none";
  }

  addComments(review){
    // const data = {"product": this.prodcutDetails.id, "buyer": this.userId, "comment": review}
    this.comments.addComments({"product": this.prodcutDetails.id, "buyer": this.userId, "comment": review}).subscribe(item => {
      console.log(item);
    })
  }

}
