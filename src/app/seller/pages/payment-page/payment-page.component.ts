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
import swal from 'sweetalert';

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
    
    this.authService.s_uId.subscribe((s_uid) => {
      console.log(s_uid);
      if (s_uid != null) {
        this.authService.sellerIsApproved(s_uid).subscribe((item: any) => {
          console.log(item);
          // Approved User, User Not Approve
          this.subscription.isSubscribed().subscribe((item2: any) => {
            console.log(item2);
            // User Not Subscribe, Subscribe User
            if (
              item.message != 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              this.router.navigate(['/dashboard/welcome']);
            } else if (
              item.message == 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              swal(
                'Access Denied!',
                'you are not subscribed to any plan! Please subscribe.',
                'error'
              );
              this.router.navigate(['/dashboard/subscription-plan']);
            }
          });
        });
      }
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
