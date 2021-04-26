import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartServiceService } from '../../../shared/services/cart-service.service';
import {SubscriptionService} from '../../../shared/services/subscription.service';
@Component({
  selector: 'app-payment-verify',
  templateUrl: './payment-verify.component.html',
  styleUrls: ['./payment-verify.component.css'],
})
export class PaymentVerifyComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cart: CartServiceService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    let data = JSON.parse(localStorage.getItem('payment_add_response'))
    console.log(data)
    //this.router.navigate(['/order/details/',localStorage.getItem('temp_order_id')]);
    let check_api_json;
    if (localStorage.getItem('temp_order_id')) {
      // for order payment verification
      check_api_json = {
        //json data for verifying payment
        tran_ref: data.tran_ref,
        order: localStorage.getItem('temp_order_id'),
        cart_currency: data.cart_currency,
        cart_amount: data.cart_amount,
        cart_id: data.cart_id,
        cart_description: data.cart_description,
        tran_type: data.tran_type,
      };
    } else {
      // for subscription payment verification
      check_api_json = {
        //json data for verifying payment
        tran_ref: data.tran_ref,
        subscription: localStorage.getItem('temp_subscription_id'),
        cart_currency: data.cart_currency,
        cart_amount: data.cart_amount,
        cart_id: data.cart_id,
        cart_description: data.cart_description,
        tran_type: data.tran_type,
      };
    }
    console.log(JSON.stringify(check_api_json));
    this.orderService.verify_payment(check_api_json).subscribe(
      (success) => {
        if (success.success === 'True') {
          //this.router.navigate(['/order/details/',localStorage.getItem('temp_order_id')]);
          this.spinner.hide();
          swal('Succeed!', 'Payment Verified', 'success').then((isValid) => {
            let order_id = localStorage.getItem('temp_order_code');
            //localStorage.removeItem('temp_order_id');
            localStorage.removeItem('prodCartArray');
            localStorage.removeItem('finalCart');
            localStorage.removeItem('cart_items');
            localStorage.removeItem('cart_cash');
            localStorage.removeItem('payment_add_response');
            localStorage.removeItem('cart');
            this.cart.existingCartLength.next(null);
            if (order_id) {
              //this.router.navigate(['/order/details/', order_id]);
              this.router.navigate(['/profile'], { queryParams: { activeItem: '3',cardOrderPlaced:'true' } });
            } else {
              this.router.navigate(['/dashboard']);
            }
          });
        }
      },
      (error) => {
        this.spinner.hide();
        swal('Failed', 'Failed to verify payment', 'error');
        var seller = localStorage.getItem('s_uid');
        if (seller) {
          this.router.navigate(['/dashboard']);
          console.log(error);
        } else {
          this.router.navigate(['/cart']);
        }
      }
    );
  }
}
