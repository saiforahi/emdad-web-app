import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-subscription-plan-page',
  templateUrl: './subscription-plan-page.component.html',
  styleUrls: ['./subscription-plan-page.component.css'],
})
export class SubscriptionPlanPageComponent implements OnInit {
  planList: any;
  selectedPlanId;
  couponButtonClicked: boolean;
  couponInput: any = '';
  msg: any = '';
  error: any;
  couponType: any;
  couponDiscount: number = null;
  user: any;

  fees: any;
  payment_type = 1;
  payment_status = 1;
  total_paid_amount: any;
  discount_amount: number = 0;
  seller: string = null;
  subscription_plan: any;
  discount_coupon: string = '';
  created_by: any;

  constructor(
    private subscription: SubscriptionService,
    private coupon: CouponService,
    private order: OrderService,
    private authService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.subscription.plans().subscribe((items) => {
      // console.log(items);
      this.planList = items.data[0];
    });
    this.seller = localStorage.getItem('s_uid');
    this.created_by = localStorage.getItem('s_uid');
    this.authService
      .getUser(localStorage.getItem('s_uid'))
      .subscribe((data) => {
        this.user = data.data;
        // console.log(this.user);
      });
  }

  selectedPlan(index) {
    this.selectedPlanId = index;
  }

  applyCoupon() {
    this.couponButtonClicked = true;
    let coupon_code = this.couponInput;
    const coupon_section = 1; // 1 for subscription, 2 for order
    this.coupon.validateCoupon(coupon_section, coupon_code).subscribe(
      (success) => {
        // console.log(success);
        if (success.data == undefined) {
          this.msg = success.message;
          this.couponButtonClicked = false;
          this.discount_coupon = '';
          this.couponDiscount = null;
          this.discount_amount = 0;
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

  proceedToPay() {
    this.fees = this.planList[this.selectedPlanId].fees;
    this.total_paid_amount = this.fees;
    this.subscription_plan = this.planList[this.selectedPlanId].id;
    if (this.couponDiscount) {
      this.total_paid_amount -= this.couponDiscount;
      this.discount_amount = this.couponDiscount;
    }

    let response = {
      fees: this.fees,
      payment_type: this.payment_type,
      payment_status: this.payment_status,
      total_paid_amount: this.total_paid_amount,
      discount_amount: this.discount_amount,
      seller: this.seller,
      subscription_plan: this.subscription_plan,
      discount_coupon: this.discount_coupon,
      created_by: this.created_by,
    };

    this.subscription
      .subscribeToPlan(
        response.fees,
        response.payment_type,
        response.payment_status,
        response.total_paid_amount,
        response.discount_amount,
        response.seller,
        response.subscription_plan,
        response.discount_coupon,
        response.created_by
      )
      .subscribe(
        (data) => {
          localStorage.setItem('temp_subscription_id', data.id);
          this.order
            .add_payment({
              tran_type: 'sale',
              cart_description: 'sale',
              cart_id: '400000000000001',
              cart_currency: 'SAR',
              cart_amount: response.total_paid_amount,
              customer_details: {
                name: this.user.full_name,
                email: localStorage.getItem('username'),
                phone: this.user.phone,
                street1: this.user.area,
                city: this.user.city,
                state: 'DU',
                country: this.user.country,
                zip_code: this.user.zip_code,
                ip: '127.0.0.1',
              },
            })
            .subscribe(
              (success) => {
                localStorage.setItem(
                  'payment_add_response',
                  JSON.stringify(success)
                );
                // console.log(
                //   'payment_add_response',
                //   JSON.parse(localStorage.getItem('payment_add_response'))
                // );
                window.location.href = success.redirect_url;
                // console.log(success);
              },
              (gateWayErr) => {
                console.log(gateWayErr);
              }
            );
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
