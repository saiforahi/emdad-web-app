import { Component, Input, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/models/mocks/Orders';
import { OrderService } from '../../../shared/services/order.service';
@Component({
  selector: 'app-order-history-table',
  templateUrl: './order-history-table.component.html',
  styleUrls: ['./order-history-table.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orders:any=[];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    //this.orderService.get_order_list().subscribe(res=>console.log(res.data));
    this.get_orders();
    console.log(this.orders)
  }
  get_orders(){
    //this.orders=Orders
    this.orderService.get_buyer_order_list().subscribe(res=>{
      this.orders=res.data;
      console.log(this.orders);
    });
  }
}
