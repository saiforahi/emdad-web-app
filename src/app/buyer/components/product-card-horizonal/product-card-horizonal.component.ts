import { Component, Input, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { GetProductService } from '../../../shared/services/get-product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { config } from 'src/config';
import { CartServiceService } from 'src/app/shared/services/cart-service.service';
import { Cart } from 'src/app/shared/models/Cart.model';
import { Product } from 'src/app/shared/models/Product.model';
@Component({
  selector: 'app-product-card-horizonal',
  templateUrl: './product-card-horizonal.component.html',
  styleUrls: ['./product-card-horizonal.component.css'],
})
export class ProductCardHorizonalComponent implements OnInit {
  @Input() product:any;
  defaultImage = '../assets/images/default-image-620x600.jpg';
  prodCartArray = [];
  prod_qty: number=1;
  userId:any;
  img_base_url = config.img_base_url;
  addToCart:any='true'
  constructor(
    private wishlist: WishlistService,
    private snackBar: MatSnackBar,
    private user: UserAuthService,
    private ProductService: GetProductService,
    private router: Router,
    private cartService: CartServiceService
  ) {}

  ngOnInit(): void {
    // console.log(this.product)
    this.user.uId.subscribe((item) => {
      this.userId = item;
    });
    console.log(this.product);
  }
  add_to_cart(prod:Product){
    let existingCart:Cart = JSON.parse(localStorage.getItem('cart')); //fetching existing cart from local storage
    let existingCartLength:number=0; //initializing number of products in 
    var foundSameProduct:boolean = false;
    if(existingCart===null){
      existingCart=new Cart() //initializing cart object if it's the first attempt to add to cart
    }
    if(existingCart?.products?.length>0){
      existingCartLength=existingCart.products.length
      existingCart.products.forEach((element) => {
        if (element.id == prod.id) {
          console.log('element qty:',element.cart_qty)
          console.log('selected qty:',this.prod_qty)
          element.cart_qty= Number(element.cart_qty) + Number(this.prod_qty)
          foundSameProduct = true;
        }
      });
    }
    if (prod && !foundSameProduct) {
      prod.cart_qty = this.prod_qty;
      existingCart.products.push(prod);
      this.cartService.existingCartLength.next(existingCartLength + 1);
      localStorage.setItem('cart', JSON.stringify(existingCart));
      this.openSnackBar('Product added to cart!', 'OK');
    } else {
      this.openSnackBar('Product is already in cart!', 'OK');
    }
    this.prod_qty=1
  }
  // addToCart(prod:Product) {
  //   var foundSameProduct = false;
  //   console.log('selected prod: ',prod)
  //   if (this.prod_qty > 0) {
  //     prod.cart_qty = this.prod_qty > 0 ? this.prod_qty : 1;
  //     this.prodCartArray = [];
  //     var existingCart = JSON.parse(localStorage.getItem('prodCartArray'));

  //     if (existingCart != null) {
  //       existingCart.forEach((element) => {
  //         if (prod.id != element.id) {
  //           this.prodCartArray.push(element);
  //         } else {
  //           // console.log('cart matched product', prod);
  //           this.openSnackBar('Product cart quantity updated', 'OK');
  //           foundSameProduct = true;
  //           prod.cart_qty =
  //             parseInt(element.cart_qty) +prod.cart_qty;
  //         }
  //       });
  //     }

  //     // if same product not in cart previously, then show the notification
  //     if (foundSameProduct === false) {
  //       //this.cart.existingCartLength.next(existingCart.length + 1);
  //       if(existingCart!=null){
  //         this.cartService.existingCartLength.next(existingCart.length + 1);
  //       }
  //       else{
  //         this.cartService.existingCartLength.next(1);
  //       }
  //       this.openSnackBar('Added to Cart', 'OK');
  //     }

  //     this.prodCartArray.push(prod);
  //     localStorage.setItem('prodCartArray', JSON.stringify(this.prodCartArray));
  //     this.prod_qty = 0;
  //   } else {
  //     this.prod_qty = 0;
  //     this.openSnackBar('Invalid Quantity', 'OK');
  //   }
  // }

  addToWishlist(prod_id) {
    if (this.userId) {
      this.wishlist.addTowishlist(prod_id).subscribe((item: any) => {
        this.openSnackBar(item.message, 'OK');
      });
    } else {
      document.getElementById('buyerLogin').style.display = 'block';
    }
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  slice_image_url(url: string) {
    if (url.includes(this.img_base_url)) {
      // console.log(url.slice(21));
      return url.slice(21);
    } else {
      // console.log(url);
      return url;
    }
  }
  
  get_unit_price(product_commission:any,price:any){ //generating unit price with commission
    let total=0
    if(parseFloat(product_commission)>0){
      let unit_price=parseFloat(price)* (parseFloat(product_commission) / 100)
      total = unit_price + parseFloat(price)
      //console.log('if total',total)
      //console.log('unit price',(parseFloat(unit_price) * (product_commission / 100))+parseFloat(unit_price))
      //return (parseFloat(unit_price) * (product_commission / 100))+parseFloat(unit_price)
    }
    else{
      
      let unit_price=parseFloat(price)* (parseFloat(localStorage.getItem('commission')) / 100)
      total = unit_price + parseFloat(price)
      //console.log('else total',total)
    }
    return (total+(total*(parseFloat(localStorage.getItem('vat'))/100))).toFixed(2)
  }
  check_qty(value:any){
    if(parseInt(value)<=parseInt(this.product.stock_quantity) && parseInt(value)>0 && value!=null){
      this.addToCart='true'
    }
    else if(parseInt(value)<=0 || value==null){
      console.log('value',value)
      this.addToCart='n/a'
    }
    else{
      this.addToCart='false'
    }
  }

}
