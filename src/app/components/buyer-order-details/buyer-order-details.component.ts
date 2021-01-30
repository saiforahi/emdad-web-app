import { Component, Input, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/models/mocks/Orders';
import { OrderService } from '../../shared/services/order.service';
@Component({
  selector: 'app-buyer-order-details',
  templateUrl: './buyer-order-details.component.html',
  styleUrls: ['./buyer-order-details.component.css'],
})
export class BuyerOrderDetailsComponent implements OnInit {
  orders=[];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    //this.orderService.get_order_list().subscribe(res=>console.log(res.data));
    this.get_orders();
    console.log(this.orders)
  }
  get_orders(){
    this.orders=Orders
    //this.orderService.get_order_list().subscribe(res=>this.orders=res.data);
  }
}
