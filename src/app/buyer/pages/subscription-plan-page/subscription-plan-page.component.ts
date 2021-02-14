import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { CouponService } from '../../../shared/services/coupon.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-plan-page',
  templateUrl: './subscription-plan-page.component.html',
  styleUrls: ['./subscription-plan-page.component.css'],
})
export class SubscriptionPlanPageComponent implements OnInit {
  plans;
  error;
  msg;
  userId;

  constructor(
    private subscriptions: SubscriptionService,
    private coupons: CouponService,
    private authService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.plans().subscribe((item) => {
      console.log(item);
      this.plans = item.data[0];
    });
    this.authService.uId.subscribe((item) => {
      this.userId = item;
    });
  }

  selectedPlan(selectedPlan) {
    localStorage.setItem('selectedPlanId', selectedPlan.id);
    localStorage.setItem('selectedPlanTitle', selectedPlan.subscription_plan);
    localStorage.setItem('selectedPlanFees', selectedPlan.fees);
    this.router.navigate(['/subscription/payment']);
  }

  applyCoupon(coupon_code) {
    const coupon_section = 2; // 1 for buyer and 2 for seller
    console.log(coupon_code);
    this.coupons.validateCoupon(coupon_section, coupon_code).subscribe(
      (success) => {
        console.log(success);
        if (success.data == undefined) {
          this.msg = success.message;
        } else {
          this.msg =
            'you got ' + success.data[0].discount_amount + ' discount.';
          localStorage.setItem(
            'couponDiscount',
            success.data[0].discount_amount
          );
          localStorage.setItem('couponId', success.data[0].id);
        }
      },
      (error) => {
        this.error = error;
        console.log(error);
      }
    );
  }
}
