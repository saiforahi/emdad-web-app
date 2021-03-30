import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-subscription-plan-page',
  templateUrl: './subscription-plan-page.component.html',
  styleUrls: ['./subscription-plan-page.component.css']
})
export class SubscriptionPlanPageComponent implements OnInit {
  planList: any;
  selectedPlanId;
  couponButtonClicked: boolean;
  couponInput: any = '';
  msg: any = '';
  discount_coupon: string;
  couponDiscount: number = null;
  couponType: any;
  error: any;

  constructor(private subscription: SubscriptionService, 
    private coupon: CouponService,) { }

  ngOnInit(): void {
    this.subscription.plans().subscribe(items => {
      console.log(items)
      this.planList = items.data[0];
    })
  }

  selectedPlan(index){
    this.selectedPlanId = index;
  }

  applyCoupon() {
    this.couponButtonClicked = true;
    let coupon_code = this.couponInput;
    const coupon_section = 1; // 1 for subscription, 2 for order
    this.coupon.validateCoupon(coupon_section, coupon_code).subscribe(
      (success) => {
        console.log(success);
        if (success.data == undefined) {
          this.msg = success.message;
          this.couponButtonClicked = false;
          this.discount_coupon = '';
          this.couponDiscount = null;
        } else {
          this.msg = `${success.data[0].coupon_title} applied!`;
          this.couponDiscount = parseInt(success.data[0].discount_amount);
          this.discount_coupon = success.data[0].id;
          this.couponType = success.data[0].coupon_type;
          // this.calcTotalPrice();
          this.couponButtonClicked = false;
        }
      },
      (error) => {
        this.error = error;
        console.log(error);
        this.couponButtonClicked = false;
      }
    );
  }

  proceedToPay(){
    console.log(this.couponDiscount);
    console.log(this.planList[this.selectedPlanId])
  }

}
