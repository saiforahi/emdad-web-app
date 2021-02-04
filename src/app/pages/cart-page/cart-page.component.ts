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
  commission?: number;
  product: number;
}

interface Tracking_Order {
  seller: number;
  order_created_by: number;
  order_creation_date: string;
  status: number;
}

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  userId: any;
  subTotal: number = 0;
  total_amount = 0;
  payment_type;
  discount_coupon_amount;
  discount_coupon = '';
  tracking_order: Tracking_Order[] = [];
  msg: any;
  error: any;
  vatAmount;
  couponDiscount: any = 0;
  couponType: any;
  couponId: any = '';
  commissionAmount: number;
  totalItems = 0;
  // providing default value to prevnet error
  productInCart = [
    {
      id: '',
      name: '',
      unit_price: '',
      stock_quantity: '',
      image1: '',
      image2: '',
    },
  ];
  // providing default value to prevnet error
  orders_details: Orders_Details[] = [
    {
      quantity: 0,
      unit_price: 0,
      seller: 0,
      pickup_address: 0,
      vat_amount: 0,
      commission: 0,
      product: 0,
    },
  ];

  constructor(
    private authService: UserAuthService,
    private coupon: CouponService,
    private vat: VatService,
    private commission: CommissionService
  ) {}

  ngOnInit(): void {
    this.authService.uId.subscribe((item) => {
      this.userId = item;
    });
    this.productInCart = JSON.parse(localStorage.getItem('prodCartArray'));
    // console.log('*****');
    // console.log(this.productInCart);
    // console.log('*****');

    this.vat.getVat().subscribe((item) => {
      this.vatAmount = parseInt(item.data[0].percentage);
      this.generateOrderData(this.productInCart);
      this.calcSubTotalPrice(this.orders_details);
      this.calcTotalPrice();
    });
    this.commission.getCommission().subscribe((item) => {
      this.commissionAmount = item.data[0].percentage.toString();
      this.generateOrderData(this.productInCart);
      this.calcSubTotalPrice(this.orders_details);
      this.calcTotalPrice();
    });

    // console.log(this.orders_details, this.tracking_order);
  }

  generateOrderData(productInCart) {
    this.orders_details = [];
    this.tracking_order = [];
    productInCart.forEach((element) => {
      this.orders_details.push({
        product: element.id,
        quantity: 1,
        seller: element.seller.id,
        unit_price: parseFloat(element.unit_price),
        vat_amount: this.vatAmount,
        pickup_address: element.pickup_address,
        commission: parseFloat(element.commission),
      });
      var sellerFind = this.tracking_order.find(
        (x) => x.seller === element.seller.id
      );
      if (sellerFind == undefined) {
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
    // console.log(this.productInCart);
    this.calcSubTotalPrice(this.orders_details);
    this.calcTotalPrice();
    localStorage.setItem('prodCartArray', JSON.stringify(this.productInCart));
    // console.log(this.orders_details, this.tracking_order);
  }

  calcPrice(index): number {
    if (this.orders_details[index])
      return (
        (this.orders_details[index].unit_price +
          this.orders_details[index].commission) *
        this.orders_details[index].quantity
      );
    return 0;
  }

  calcSubTotalPrice(orders_details) {
    this.subTotal = 0;
    this.totalItems = 0;
    orders_details.forEach((element) => {
      this.subTotal +=
        parseFloat(element.unit_price) * parseFloat(element.quantity) +
        parseFloat(element.commission);
      this.totalItems += element.quantity;
    });
  }

  calcTotalPrice() {
    let vatAmount =
      (this.subTotal - this.couponDiscount) * (this.vatAmount / 100);

    let discountAmount = 0;
    // flat type discount
    if (this.couponType === 1) {
      discountAmount = this.couponDiscount;
      if (discountAmount > this.subTotal) discountAmount = this.subTotal;
    }
    // percentage type discount
    if (this.couponType === 2) {
      discountAmount = this.subTotal * (this.couponDiscount / 100);
    }

    if (this.subTotal > 0)
      this.total_amount = this.subTotal - discountAmount + vatAmount;
  }

  addQuantity(index) {
    // increment only if quantity is <= stock_quantity
    if (
      this.orders_details[index].quantity + 1 <=
      parseFloat(this.productInCart[index].stock_quantity)
    ) {
      this.orders_details[index].quantity += 1;
      // console.log(this.orders_details);
      this.calcSubTotalPrice(this.orders_details);
      this.calcTotalPrice();
    }
  }

  delQuantity(index) {
    // decrement only if quantity is >= 1
    if (this.orders_details[index].quantity - 1 >= 1) {
      this.orders_details[index].quantity -= 1;
      // console.log(this.orders_details);
      this.calcSubTotalPrice(this.orders_details);
      this.calcTotalPrice();
    }
  }

  applyCoupon() {
    let coupon_code = this.discount_coupon;
    const coupon_section = 2; // 1 for subscription, 2 for order
    this.coupon.validateCoupon(coupon_section, coupon_code).subscribe(
      (success) => {
        // console.log(success);
        if (success.data == undefined) {
          this.msg = success.message;
        } else {
          this.msg = `${success.data[0].coupon_title} applied!`;
          this.couponDiscount = parseInt(success.data[0].discount_amount);
          this.couponId = success.data[0].id;
          this.couponType = success.data[0].coupon_type;
          this.calcTotalPrice();
        }
      },
      (error) => {
        this.error = error;
        console.log(error);
      }
    );
  }

  proceedToCheckout() {
    this.orders_details.forEach((element) => {
      element.vat_amount = this.vatAmount;
      element.commission = this.commissionAmount;
    });
    var finalCart = {
      // total_amount: this.subTotal - this.couponDiscount + this.vatAmount,
      // buyer: this.userId,
      // payment_type: '1',
      // discount_coupon_amount: this.couponDiscount,
      // discount_coupon: this.couponId,
      // orders_details: this.orders_details,
      // tracking_order: this.tracking_order,
      subtotal: this.subTotal,
      discount: this.commissionAmount,
      vat: this.vatAmount,
      total: this.total_amount,
    };
    localStorage.setItem('finalCart', JSON.stringify(finalCart));
    // console.log(localStorage.getItem('finalCart'));
  }
}
