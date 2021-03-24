import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { CouponService } from '../../../shared/services/coupon.service';
import { VatService } from '../../../shared/services/vat.service';
import { CommissionService } from '../../../shared/services/commission.services';
import { config } from 'src/config';
import { CartServiceService } from 'src/app/shared/services/cart-service.service';
import { Router } from '@angular/router';
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
  product: number;
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
  couponInput: string = '';
  discount_coupon_amount;
  discount_coupon = '';
  tracking_order: Tracking_Order[] = [];
  msg: any;
  error: any;
  vatPercentage = 0;
  vatAmount: number = 0;
  couponDiscount: any = 0;
  couponType: any;
  couponId: any = '';
  commissionAmount: number;
  totalItems = 0;
  img_base_url = config.img_base_url;
  emptyCart: boolean = true;
  couponButtonClicked: boolean = false;
  commissionList: any = [];

  // providing default value to prevnet error
  productInCart = [
    {
      id: '',
      name: '',
      cart_qty: '',
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
    private commission: CommissionService,
    private cart: CartServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.authService.uId.subscribe((item) => {
      this.userId = item;
    });
    this.productInCart = JSON.parse(localStorage.getItem('prodCartArray'));
    if (this.productInCart !== null && this.productInCart.length > 0)
      this.emptyCart = false;

    // too much repetead work
    // need to update
    if (!this.emptyCart) {
      this.commission.getCommission().subscribe(
        (item) => {
          this.commissionAmount = parseFloat(
            item.data[0].percentage.toString()
          );
          this.generateOrderData(this.productInCart);
          this.calcSubTotalPrice(this.orders_details);
          this.calcTotalPrice();
        },
        (err) => {
          console.log(err);
        }
      );

      this.vat.getVat().subscribe((item) => {
        this.vatPercentage = parseFloat(item.data[0].percentage);
        this.generateOrderData(this.productInCart);
        this.calcSubTotalPrice(this.orders_details);
        this.calcTotalPrice();
      });

      this.generateOrderData(this.productInCart);
      this.calcSubTotalPrice(this.orders_details);
      this.calcTotalPrice();
      // console.log(this.orders_details, this.tracking_order);
    }
  }

  generateOrderData(productInCart) {
    this.orders_details = [];
    this.tracking_order = [];
    this.commissionList = [];

    productInCart.forEach((element) => {
      // console.log(element);
      var quantity = 1;
      if (element.cart_qty !== undefined) parseInt(element.cart_qty);

      var commission = 0;
      if (
        element.commission !== undefined &&
        parseFloat(element.commission) > 0
      )
        commission = parseFloat(element.commission);
      else commission = this.commissionAmount;
      commission = parseFloat(element.unit_price) * (commission / 100);
      this.commissionList.push(commission);

      this.orders_details.push({
        product: element.id,
        // quantity:
        //   element.cart_qty !== undefined ? parseInt(element.cart_qty) : 1,
        quantity: quantity,
        seller: element.seller.id,
        unit_price: parseFloat(element.unit_price),
        vat_amount: 0,
        pickup_address: element.pickup_address.id,
        commission: 0,
      });

      this.tracking_order.push({
        seller: element.seller.id,
        product: element.id,
        status: 1,
        order_created_by: this.userId,
        order_creation_date: '',
      });
      // var sellerFind = this.tracking_order.find(
      //   (x) => x.seller === element.seller.id
      // );
      // if (sellerFind == undefined) {
      //   this.tracking_order.push({
      //     seller: element.seller.id,
      //     product: element.id,
      //     status: 1,
      //     order_created_by: this.userId,
      //     order_creation_date: '',
      //   });
      // }
    });
  }

  removeFromCart(prodId) {
    this.productInCart.forEach((value, index) => {
      if (value.id == prodId) {
        this.productInCart.splice(index, 1);
      }
    });
    this.cart.existingCartLength.next(
      this.productInCart.length > 0 ? this.productInCart.length : null
    );
    this.generateOrderData(this.productInCart);
    // console.log(this.productInCart);
    this.calcSubTotalPrice(this.orders_details);
    this.calcTotalPrice();
    localStorage.setItem('prodCartArray', JSON.stringify(this.productInCart));
    if (this.productInCart.length === 0) this.emptyCart = true;
    // console.log(this.orders_details, this.tracking_order);
  }

  calcPrice(index): number {
    if (this.orders_details[index]) {
      var price =
        this.orders_details[index].unit_price *
        this.orders_details[index].quantity;
      var commission =
        this.commissionList[index] * this.orders_details[index].quantity;
      var totalPrice = price + commission;

      this.orders_details[index].vat_amount = Number(
        (totalPrice * (this.vatPercentage / 100)).toFixed(2)
      );
      this.orders_details[index].commission = Number(commission.toFixed(2));

      return price + commission;
    }
    return 0;
  }

  calcSubTotalPrice(orders_details) {
    this.subTotal = 0;
    this.totalItems = 0;
    orders_details.forEach((element, index) => {
      // this.subTotal +=
      //   parseFloat(element.unit_price) * parseFloat(element.quantity) +
      //   parseFloat(element.commission);
      this.subTotal += this.calcPrice(index);
      this.totalItems++;
    });
  }

  calcTotalPrice() {
    this.total_amount = 0;
    let discountAmount = 0;

    // flat type discount
    if (this.couponType === 1) {
      discountAmount = this.couponDiscount;
    }
    // percentage type discount
    if (this.couponType === 2) {
      discountAmount = this.subTotal * (this.couponDiscount / 100);
    }

    if (discountAmount > this.subTotal) discountAmount = this.subTotal;
    this.discount_coupon_amount = discountAmount;

    // discount is applied before applying vat
    // this.vatAmount =
    //   (this.subTotal - this.discount_coupon_amount) *
    //   (this.vatPercentage / 100);

    this.calcVat();

    if (this.subTotal > 0)
      this.total_amount = this.subTotal - discountAmount + this.vatAmount;
  }

  calcVat() {
    this.vatAmount = 0;
    this.orders_details.forEach((element) => {
      this.vatAmount += element.vat_amount;
    });
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
    this.couponButtonClicked = true;
    let coupon_code = this.couponInput;
    const coupon_section = 2; // 1 for subscription, 2 for order
    this.coupon.validateCoupon(coupon_section, coupon_code).subscribe(
      (success) => {
        // console.log(success);
        if (success.data == undefined) {
          this.msg = success.message;
          this.couponButtonClicked = false;
          this.discount_coupon = '';
        } else {
          this.msg = `${success.data[0].coupon_title} applied!`;
          this.couponDiscount = parseInt(success.data[0].discount_amount);
          this.discount_coupon = success.data[0].id;
          this.couponType = success.data[0].coupon_type;
          this.calcTotalPrice();
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

  proceedToCheckout() {
    // this.orders_details.forEach((element) => {
    //   element.vat_amount = this.vatAmount;
    //   element.commission = this.commissionAmount;
    // });

    var cart_cash = {
      subtotal: this.subTotal,
      discount: this.discount_coupon_amount,
      discount_type: this.couponType,
      vat: this.vatAmount,
      total: Number(this.total_amount.toFixed(2)),
    };

    let cart_items = {
      total_amount: Number(this.total_amount.toFixed(2)),
      buyer: localStorage.getItem('uid'),
      payment_type: '',
      discount_coupon_amount: this.discount_coupon_amount,
      discount_coupon: this.discount_coupon,
      orders_details: this.orders_details,
      tracking_order: this.tracking_order,
    };

    localStorage.setItem('cart_items', JSON.stringify(cart_items));
    localStorage.setItem('cart_cash', JSON.stringify(cart_cash));
    console.log(localStorage.getItem('cart_json'));
    //this.router.navigate(['checkout',cart_items])
  }
}
