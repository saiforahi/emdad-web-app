import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerReviewService } from 'src/app/shared/services/customer-review.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-review-modal',
  templateUrl: './product-review-modal.component.html',
  styleUrls: ['./product-review-modal.component.css'],
})
export class ProductReviewModalComponent implements OnInit {
  @Input() prodcutDetails:any;
  userId: any;
  reviewText: string = '';

  constructor(
    private comments: CustomerReviewService,
    private user: UserAuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.user.uId.subscribe((item) => {
      this.userId = item;
    });
  }

  hide_review_modal() {
    document.getElementById('prodReviewModal').style.display = 'none';
  }

  addComments() {
    // const data = {"product": this.prodcutDetails.id, "buyer": this.userId, "comment": review}
    this.spinner.show();
    if (this.reviewText.length > 0) {
      this.comments
        .addComments({
          product: this.prodcutDetails.id,
          buyer: this.userId,
          comment: this.reviewText,
        })
        .subscribe(
          (item: any) => {
            // console.log(item.message);
            // var comment: object = item;
            document.getElementById('prodReviewModal').style.display = 'none';
            this.openSnackBar(item.message, 'ok');
            this.spinner.hide();
            this.reviewText = '';
            this.router.navigate(['/product/details/', this.prodcutDetails.id])
          },
          (error) => {
            document.getElementById('prodReviewModal').style.display = 'none';
            this.openSnackBar(error.error.message, 'ok');
            this.spinner.hide();
            this.reviewText = '';
          }
        );
    } else {
      this.spinner.hide();
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
