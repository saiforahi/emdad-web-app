import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {
  orders:any[]
  statuses:string[]
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.get_orders();
    this.get_statuses();
    console.log(this.orders)
  }
  get_orders(){
    this.orderService.get_order_list().subscribe(result =>{
      console.log(result)
      this.orders = result;
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
}
