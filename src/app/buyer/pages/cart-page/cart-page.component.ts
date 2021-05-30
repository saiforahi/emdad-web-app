import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { CouponService } from '../../../shared/services/coupon.service';
import { VatService } from '../../../shared/services/vat.service';
import { CommissionService } from '../../../shared/services/commission.services';
import { config } from 'src/config';
import { CartServiceService } from 'src/app/shared/services/cart-service.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/Cart.model';
import { Product } from 'src/app/shared/models/Product.model';
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
  discount_coupon_amount:any;
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
  trans_totalItems={totalItems:this.totalItems}
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
  // orders_details: Orders_Details[] = [
  //   {
  //     quantity: 0,
  //     unit_price: 0,
  //     seller: 0,
  //     pickup_address: 0,
  //     vat_amount: 0,
  //     commission: 0,
  //     product: 0,
  //   },
  // ];
  cart:Cart; //declaring cart object

  constructor(
    private authService: UserAuthService,
    private coupon: CouponService,
    private vat: VatService,
    private commission: CommissionService,
    private cartService: CartServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // var values = [],
    //     keys = Object.keys(localStorage),
    //     i = keys.length;

    // while ( i-- ) {
    //     values.push( localStorage.getItem(keys[i]) );
    // }
    console.log('token',localStorage.getItem('token'))
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.authService.uId.subscribe((item) => {
      this.userId = item;
    });
    if(JSON.parse(localStorage.getItem('cart'))){
      this.cart = JSON.parse(localStorage.getItem('cart'));
      console.log('cart:',this.cart);
      if (this.cart !== null && this.cart.products?.length > 0){
        this.emptyCart = false;
      }
    }
    // this.cart = JSON.parse(localStorage.getItem('cart'));
    // console.log('products in cart',this.productInCart)
    // if (this.cart !== null && this.cart.products?.length > 0)
    //   this.emptyCart = false;

    // too much repetead work
    // need to update
    if (!this.emptyCart) {
      this.commission.getCommission().subscribe(
        (item) => {
          console.log('commision',item.data[0].percentage.toString())
          this.commissionAmount = parseFloat(
            item.data[0].percentage.toString()
          );
          localStorage.setItem('commission',item.data[0].percentage.toString())
          this.vat.getVat().subscribe((item) => {
            this.vatPercentage = parseFloat(item.data[0].percentage);
            this.generateOrderData(this.cart.products);
            this.calcSubTotalPrice();
            this.calcTotalPrice();
          });
        },
        (err) => {
          console.log(err);
        }
      );
      // console.log(this.orders_details, this.tracking_order);
    }
  }

  generateOrderData(productInCart:Array<Product>) {
    let orders_details = [];
    this.tracking_order = [];
    this.commissionList = [];
    console.log('products',productInCart)
    productInCart.forEach((element) => {
      // console.log(element);
      var quantity = 1;
      var commission = 0;
      if (!isNaN(Number(element.commission)) && Number(element.commission)>0){
        commission = parseFloat(element.commission);
      }
      else{ 
        commission = this.commissionAmount;
      }
      commission = parseFloat(element.unit_price) * (commission / 100);
      this.commissionList.push(commission);
      // orders_details.push({
      //   product: element.id,
      //   // quantity:
      //   //   element.cart_qty !== undefined ? parseInt(element.cart_qty) : 1,
      //   quantity: quantity,
      //   seller: element.seller.id,
      //   unit_price: parseFloat(element.unit_price),
      //   vat_amount: 0,
      //   pickup_address: element.pickup_address[0].id,
      //   commission: 0,
      // });

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
    //console.log('commission list',this.commissionList)
  }

  removeFromCart(prodId: number) {
    this.cart.products.forEach((value, index) => {
      if (value.id == prodId) {
        this.cart.products.splice(index, 1);
      }
    });
    this.cartService.existingCartLength.next(
      this.cart.products.length > 0 ? this.cart.products.length : null
    );
    //this.generateOrderData(this.cart.products);
    this.calcSubTotalPrice();
    this.calcTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cart));
    if (this.cart.products.length === 0) this.emptyCart = true;
  }

  calcPrice(index:number): number {
    if (this.cart.products[index]) {
      var price = parseFloat(this.cart.products[index].unit_price) * this.cart.products[index].cart_qty;
      var commission = this.commissionList[index] * this.cart.products[index].cart_qty;
      var totalPrice = price + commission;
      this.cart.products[index].vat_amount = (totalPrice * (this.vatPercentage / 100)).toFixed(2)
      //this.cart.products[index].commission = commission.toFixed(2);
      return price + commission;
    }
    return 0;
  }

  calcSubTotalPrice() {
    this.subTotal = 0;
    this.totalItems = 0;
    this.cart.products.forEach((product, index) => {
      // this.subTotal +=
      //   parseFloat(element.unit_price) * parseFloat(element.quantity) +
      //   parseFloat(element.commission);
      this.subTotal += this.calcPrice(index);
      this.totalItems++;
    });
    //console.log('sub total',this.subTotal)
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
    this.cart.products.forEach((element) => {
      this.vatAmount += parseFloat(element.vat_amount);
    });
  }

  addQuantity(index: number) {
    // increment only if quantity is <= stock_quantity
    if (this.cart.products[index].cart_qty + 1 <= this.cart.products[index].stock_quantity) {
      this.cart.products[index].cart_qty += 1;
      // console.log(this.orders_details);
      this.calcSubTotalPrice();
      this.calcTotalPrice();
    }
  }

  delQuantity(index) {
    // decrement only if quantity is >= 1
    if (this.cart.products[index].cart_qty - 1 >= 1) {
      this.cart.products[index].cart_qty -= 1;
      // console.log(this.orders_details);
      this.calcSubTotalPrice();
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
    console.log('checking out...')
    let orders_details=[]
    this.cart.products.forEach((product:Product) => {
      console.log('deli meth',product.delivery_method)
      let commission:number=0
      if(Number(product.commission)>0){
        commission= parseFloat(product.unit_price) * (parseFloat(product.commission)/100)
      }
      else{
        commission= parseFloat(product.unit_price) * (parseFloat(localStorage.getItem('commission'))/100)
      }
      if(product.delivery_method ===1){
        orders_details.push({
          quantity:product.cart_qty,
          unit_price:product.unit_price,
          seller:product.seller.id,
          pickup_address:product.pickup_address[0]?.id,
          shipping_address:'',
          //pickup_address:product.delivery_method ===1?'':product.pickup_address[0]?.id,
          vat_amount:product.vat_amount,
          commission:commission.toFixed(2),
          product:product.id
        })
      }
      else{
        orders_details.push({
          quantity:product.cart_qty,
          unit_price:product.unit_price,
          seller:product.seller.id,
          pickup_address:product.pickup_address[0]?.id,
          shipping_address:'',
          //shipping_address:'',
          //pickup_address:product.delivery_method ===1?'':product.pickup_address[0]?.id,
          vat_amount:product.vat_amount,
          commission:commission.toFixed(2),
          product:product.id
        })
      }
    });
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
      orders_details: orders_details,
      tracking_order: this.tracking_order,
      total_items: this.totalItems
    };

    localStorage.setItem('cart_items', JSON.stringify(cart_items));
    localStorage.setItem('cart_cash', JSON.stringify(cart_cash));
    console.log('cart cash',localStorage.getItem('cart_cash'));
    console.log('cart items',localStorage.getItem('cart_items'));
    this.router.navigate(['/checkout'])
    //this.router.navigate(['checkout',cart_items])
  }
}
