import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  finalCart: any;
  msg: any = '';
  error: any = '';

  constructor(private order: OrderService) { }

  ngOnInit(): void {
    this.finalCart = JSON.parse(localStorage.getItem("finalCart"));
    console.log(this.finalCart);
  }

  checkout(){
    this.order.putOrder(this.finalCart).subscribe(
      (success) => {
        console.log(success)
        this.msg = success.message;
        localStorage.removeItem('prodCartArray')
        localStorage.removeItem("finalCart")
      },
      (error) => {
        console.log(error)
        this.error = error.message;
      }
    )
  }

}
