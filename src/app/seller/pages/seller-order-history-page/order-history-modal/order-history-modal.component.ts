import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { config } from 'src/config';
import {OrderService} from '../../../../shared/services/order.service'

@Component({
  selector: 'app-order-history-modal',
  templateUrl: './order-history-modal.component.html',
  styleUrls: ['./order-history-modal.component.css']
})
export class OrderHistoryModalComponent implements OnInit {
  details:any
  img_base_url:string=config.img_base_url
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private orderService:OrderService) { }

  ngOnInit(): void {
    console.log(this.data.order)
    this.orderService.get_seller_order_details(this.data.order.order.id).subscribe(
      (success)=> {this.details=success.data;console.log('details',success.data)}
    )
  }

  get_price(unit_price:string,quantity:string,commission:string,vat_amount:string){
    return (parseFloat(unit_price)*parseFloat(quantity)).toFixed(2)
  }

  formatDate(date:string){
    if(date!=null){
      return new Date(date).toDateString()
    }
    return '-'
  }
}
