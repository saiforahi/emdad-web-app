import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../shared/services/order.service'
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-payment-verify',
  templateUrl: './payment-verify.component.html',
  styleUrls: ['./payment-verify.component.css']
})
export class PaymentVerifyComponent implements OnInit {

  constructor(private orderService:OrderService, private router:Router,private spinner : NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    let data=JSON.parse(localStorage.getItem('payment_add_response'))
    //this.router.navigate(['/order/details/',localStorage.getItem('temp_order_id')]);
    let check_api_json={
      "tran_ref":data.tran_ref,
      "cart_currency":data.cart_currency,
      "cart_amount":data.cart_amount,
      "cart_id":data.cart_id,
      "cart_description":data.cart_description,
      "tran_type":data.tran_type,
      "Order": localStorage.getItem('temp_order_id')
    }
    console.log(JSON.stringify(check_api_json))
    this.orderService.verify_payment(check_api_json).subscribe(
      (success)=>{
        if(success.success==="True"){
          //this.router.navigate(['/order/details/',localStorage.getItem('temp_order_id')]);
          this.spinner.hide()
          swal("Succeed!","Payment Verified","success").then((isValid)=>{
            let order_id=localStorage.getItem('temp_order_id');
            localStorage.removeItem('temp_order_id')
            this.router.navigate(['/order/details/',order_id]);
          })
        }
      },
      (error)=>{
        this.spinner.hide()
        swal('Failed','Failed to verify payment','error')
      }
    )
  }

}
