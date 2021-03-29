import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {OrderService} from '../../../../shared/services/order.service'
import {config} from '../../../../../config'
@Component({
  selector: 'app-order-view-modal',
  templateUrl: './order-view-modal.component.html',
  styleUrls: ['./order-view-modal.component.css']
})
export class OrderViewModalComponent implements OnInit {
  details:any
  img_base_url=config.img_base_url
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private orderService:OrderService) { }

  ngOnInit(): void {
    console.log('dialog data',this.data)
    this.orderService.get_seller_order_details(this.data.order.order.id).subscribe(
      (success)=>{
        console.log('details',success)
        this.details=success.data
      },
      (error)=>{}
    )
  }

  //date format helper
  formatDate(date:string){
    if(date!=null){
      return new Date(date).toDateString()
    }
    return '-'
  }
}
