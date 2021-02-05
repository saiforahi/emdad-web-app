import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerReviewService } from 'src/app/shared/services/customer-review.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

interface comment{
  message: '',
  product: '',

}

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
    private user: UserAuthService,
    
    private snackBar: MatSnackBar,) { }

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
    this.comments.addComments({"product": this.prodcutDetails.id, "buyer": this.userId, "comment": review}).subscribe((item: any) => {
      // console.log(item.message);
      // var comment: object = item;
      document.getElementById('prodReviewModal').style.display="none";
      this.openSnackBar(item.message, "ok");
    })
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
