import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/shared/services/coupon.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { HighlightSpanKind } from 'typescript';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

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
  countryList: any;
  cityList: any;
  userCountry: string = '';
  userCity: string = '';
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
    private coupon: CouponService,
    private order: OrderService,
    private countryService: CountryListService,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService,
    private spinner:NgxSpinnerService
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
    this.subscription.plans().subscribe((items) => {
      // console.log(items);
      this.planList = items.data[0];
    });
    this.seller = localStorage.getItem('s_uid');
    this.created_by = localStorage.getItem('s_uid');
    this.authService.getUser(localStorage.getItem('s_uid')).subscribe((data) => {
        this.user = data.data;
        console.log('user',this.user)
        // retrieving country and city list
        if (this.user.country) {
          this.countryService.allCountries().subscribe((data) => {
            this.countryList = data.data;
            for (var i = 0; i < this.countryList.length; i++) {
              if (this.countryList[i].id == this.user.country) {
                this.userCountry = this.countryList[i].name;
                break;
              }
            }
            if (this.user.city) {
              this.countryService
                .allCities(this.user.country)
                .subscribe((data) => {
                  this.cityList = data.data;
                  for (var i = 0; i < this.cityList.length; i++) {
                    if (this.cityList[i].id == this.user.city) {
                      this.cityList = this.cityList[i].name;
                      break;
                    }
                  }
                });
            }
          });
        }
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
    if(this.planList[this.selectedPlanId]!=undefined){
      this.spinner.show()
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
        payment_status: 0,
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
                cart_amount: this.total_paid_amount,
                customer_details: {
                  name: this.user.store_name,
                  email: this.user.email,
                  phone: this.user.phone,
                  street1: this.user.store_address,
                  city: this.user.city.name,
                  state: 'DU',
                  country: this.user.country.iso2,
                  zip_code: this.user.zip_code,
                  ip: '127.0.0.1',
                },
              })
              .subscribe(
                (success) => {
                  console.log(success)
                  localStorage.setItem(
                    'payment_add_response',
                    JSON.stringify(success)
                  );
                  // localStorage.setItem(
                  //   'subscription_data',
                  //   JSON.stringify(response)
                  // );
                  // console.log(
                  //   'subscription_add_response',
                  //   JSON.parse(localStorage.getItem('subscription_add_response'))
                  // );
                  window.location.href = success.redirect_url;
                  //console.log(this.user);
                },
                (gateWayErr) => {
                  console.log(gateWayErr);
                  this.spinner.hide()
                  swal('Failed','Payment Gateway Error','error')
                }
            );
          },
          (err) => {
            console.log(err);
            this.spinner.hide()
          }
      );
    }
    else{
      swal('No Plan is chosen','Please choose a plan','warning')
    }
  }
}
