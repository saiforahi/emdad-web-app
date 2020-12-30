import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../shared/services/user-auth.service';
import { CouponService } from '../../shared/services/coupon.service';
import { VatService } from '../../shared/services/vat.service';
import { CommissionService } from '../../shared/services/commission.services';

// interface Orders {
//   total_amount?: number;
//   payment_type?: number;
//   discount_coupon_amount?: number;
//   discount_coupon?: number;
//   orders_details: {
//     quantity: number;
//     unit_price: number;
//     seller: number;
//     pickup_address?: number;
//     vat_amount: number;
//     commission?: number;
//     product: number;
//   };
//   tracking_order: {
//     seller: number;
//     order_created_by: number;
//     order_creation_date: string;
//     status: number;
//   };
// }

interface Orders_Details {
  quantity: number;
  unit_price: number;
  seller: number;
  pickup_address?: number;
  vat_amount: number;
  commission?: string;
  product: number;
};

interface Tracking_Order {
  seller: number;
  order_created_by: number;
  order_creation_date: string;
  status: number;
};

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  userId: any;
  productInCart;
  subTotal: number = 0;
  total_amount;
  payment_type;
  discount_coupon_amount;
  discount_coupon;
  orders_details: Orders_Details[] = [];
  tracking_order: Tracking_Order[] = [];
  msg: any;
  error: any;
  vatAmount;
  couponDiscount: any = 0;
  couponId: any = '';
  commissionAmount: string;

  constructor(private authService: UserAuthService,
    private coupon: CouponService,
    private vat: VatService,
    private commission: CommissionService) {}

  ngOnInit(): void {
    this.authService.uId.subscribe((item) => {
      this.userId = item;
    });
    this.productInCart = JSON.parse(localStorage.getItem('prodCartArray'));
    this.generateOrderData(this.productInCart);
    this.calcTotalPrice(this.orders_details);
    this.vat.getVat().subscribe(item =>{
      this.vatAmount = parseInt(item.data[0].percentage);
    })
    this.commission.getCommission().subscribe(item =>{
      this.commissionAmount = item.data[0].percentage.toString();
    })
    console.log(this.orders_details, this.tracking_order);
  }

  generateOrderData(productInCart){
    this.orders_details = [];
    this.tracking_order = [];
    productInCart.forEach((element) => {
      this.orders_details.push({
        product: element.id,
        quantity: 1,
        seller: element.seller.id,
        unit_price: element.unit_price,
        vat_amount: null,
        pickup_address: null,
        commission: ''
      });
      var sellerFind = this.tracking_order.find(x => x.seller === element.seller.id);
      if(sellerFind == undefined){
        this.tracking_order.push({
          seller: element.seller.id,
          status: 1,
          order_created_by: this.userId,
          order_creation_date: '',
        });
      }
    });
  }

  removeFromCart(prodId) {
    this.productInCart.forEach((value, index) => {
      if (value.id == prodId) {
        this.productInCart.splice(index, 1);
      }
    });
    this.generateOrderData(this.productInCart);
    console.log(this.productInCart)
    this.calcTotalPrice(this.orders_details);
    localStorage.setItem('prodCartArray', JSON.stringify(this.productInCart));
    console.log(this.orders_details, this.tracking_order);
  }

  calcTotalPrice(orders_details) {
    this.subTotal = 0;
    orders_details.forEach((element) => {
      this.subTotal += parseFloat(element.unit_price) * parseFloat(element.quantity);
    });
  }

  addQuantity(index) {
    this.orders_details[index].quantity += 1;
    console.log(this.orders_details);
    this.calcTotalPrice(this.orders_details);
  }

  delQuantity(index) {
    this.orders_details[index].quantity -= 1;
    console.log(this.orders_details);
    this.calcTotalPrice(this.orders_details);
  }

  applyCoupon(coupon_code){
    const coupon_section = 2; // 1 for buyer and 2 for seller
    this.coupon.validateCoupon(coupon_section, coupon_code).subscribe(
      (success) => {
        console.log(success);
        if (success.data == undefined) {
          this.msg = success.message;
        } else {
          this.msg =
            'you got ' + success.data[0].discount_amount + ' discount.';
            this.couponDiscount = parseInt(success.data[0].discount_amount);
            this.couponId = success.data[0].id;
        }
      },
      (error) => {
        this.error = error;
        console.log(error);
      }
    )
  }

  proceedToCheckout(){
    this.orders_details.forEach(element => {
      element.vat_amount = this.vatAmount;
      element.commission = this.commissionAmount;
    });
    var finalCart = {
      "total_amount": this.subTotal - this.couponDiscount + this.vatAmount,
      "payment_type": "1",
      "discount_coupon_amount": this.couponDiscount,
      "discount_coupon": this.couponId,
      "orders_details": this.orders_details,
      "tracking_order": this.tracking_order
    }
    localStorage.setItem("finalCart", JSON.stringify(finalCart));
    console.log(localStorage.getItem("finalCart"))
  }
}
