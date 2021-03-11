import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  orders:any[]=[]
  filtered_orders:any[]=[]
  statuses:string[]
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'))
    this.get_orders();
    this.get_statuses();
    console.log(this.orders)
  }
  get_orders(){
    this.orderService.get_buyer_order_list().subscribe(result =>{
      console.log(result.data)
      this.orders = result.data;
      this.filtered_orders=result.data;
    })
  }
  handle_dropdown(){
    if(document.getElementById('filterByStatusDiv').classList.contains('show')){
      document.getElementById('filterByStatusDiv').classList.remove('show');
    }
    else{
      document.getElementById('filterByStatusDiv').classList.add('show')
    }
  }
  get_statuses(){
    this.statuses=[]
    this.orders.forEach(order=>{
      this.statuses.push(order.status)
    })
  }
  change_filter_value(value){
    this.filtered_orders=[]
    this.orders.forEach(order=>{
      // console.log('selected value:',value)
      // console.log('order',order.tracking_order[0].status)
      if(order.tracking_order[0].status==value){
        console.log("if block")
        this.filtered_orders.push(order)
      }
    })
    console.log(this.filtered_orders)
  }
  get_status(value){
    let status;
    switch (value){
      case 1:
        status="Created"
        break
      case 2:
        status="Confirmed"
        break
      case 3:
        status="Processing"
        break
      case 4:
        status="Delivered"
        break
      case 5:
        status="Completed"
        break
      default:
        status="-"
        break
    }
    return status
  }
}
