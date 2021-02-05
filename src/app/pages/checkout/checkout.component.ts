import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import {UserAuthService} from '../../shared/services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Cash_Details {
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
};
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  add_order_response:any;
  add_payment_response:any;
  isCard:boolean;
  isWired:boolean;
  new_address:boolean;
  cash_details:any;
  address:any;
  user:any;
  constructor(private route:ActivatedRoute,private authService: UserAuthService,private orderService:OrderService,) { }

  ngOnInit(): void {
    this.isCard=true;
    this.isWired=false;
    this.cash_details=JSON.parse(localStorage.getItem('finalCart'))
    console.log(this.cash_details)
    this.authService.getUser(localStorage.getItem('uid')).subscribe((data) => {
      this.user = data.data;
      console.log(this.user)
			// if country is already set then load the cities of the country
		});
  }
  show_card_inputs(){
    this.isWired=false;
    this.isCard=true;
  }
  show_wired_inputs(){
    this.isCard=false;
    this.isWired=true;
  }
  show_address_form(){
    this.new_address=!this.new_address
  }
  populate_payment_object(data){
    return {
      "tran_type":"sale",
      "cart_description":   "sale",
      "cart_id":            "400000000000001",
      "cart_currency":      "SAR",
      "cart_amount":        data.data[0].total_amount,
      "customer_details": {
          "name": this.user.full_name,
          "email": "user@mail.com",
          "phone": this.user.phone,
          "street1": "404, 11th st, void",
          "city": "Dubai",
          "state": "DU",
          "country": "AE",
          "ip": "127.0.0.1"
      }
    }
  }
  add_payment(){
    this.orderService.add_payment(this.populate_payment_object(this.add_order_response)).subscribe(
      (success)=>{
        localStorage.setItem('payment_add_response',JSON.stringify(success));
        console.log("payment_add_response",JSON.parse(localStorage.getItem('payment_add_response')));
        window.location.href=success.redirect_url
        //window.history.go(success.redirect_url)
        // window.open(success.redirect_url)
      }
    )
  }
  make_order(){
    this.orderService.putOrder(JSON.parse(localStorage.getItem('cart_json'))).subscribe(
      (success)=>{
        this.add_order_response=success;
        localStorage.setItem('temp_order_id',this.add_order_response.data[0].id)
        this.add_payment();
      }
    )
  } 
}
