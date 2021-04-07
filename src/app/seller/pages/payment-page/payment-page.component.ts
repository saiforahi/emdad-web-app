import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css'],
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup;
  cardNo: AbstractControl;
  cardHolder: AbstractControl;
  expiry: AbstractControl;
  cvv: AbstractControl;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService
  ) {
    this.authService
      .sellerIsApproved(localStorage.getItem('s_uid'))
      .subscribe((item: any) => {
        console.log(item);
        // Approved User, User Not Approve
        this.subscription.isSubscribed().subscribe((item2: any) => {
          console.log(item2);
          // User Not Subscribe, Subscribe User
          if (
            item.message != 'Approved User' &&
            item2.message != 'Subscribe User'
          ) {
            console.log('condition 1');
            this.router.navigate(['/dashboard/welcome']);
          } else if (
            item.message == 'Approved User' &&
            item2.message != 'Subscribe User'
          ) {
            console.log('condition 2');
            this.router.navigate(['/dashboard/subscription-plan']);
          }
        });
      });
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNo: ['', [Validators.required]],
      cardHolder: [''],
      expiry: [''],
      cvv: [''],
    });
    this.cardNo = this.paymentForm.controls['cardNo'];
    this.cardHolder = this.paymentForm.controls['cardHolder'];
    this.cvv = this.paymentForm.controls['cvv'];
    this.expiry = this.paymentForm.controls['expiry'];
  }

  onSubmit() {}
}
