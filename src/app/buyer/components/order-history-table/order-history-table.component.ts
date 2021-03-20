import { Component, Input, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/models/mocks/Orders';
import { OrderService } from '../../../shared/services/order.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-order-history-table',
  templateUrl: './order-history-table.component.html',
  styleUrls: ['./order-history-table.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderData: any;
  displayedColumns: string[] = [
    'Order ID',
    'Payment Date',
    'Delivery Date',
    'Amount',
    'view',
  ];
  lowValue: number = 0;
  highValue: number = 5;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.get_orders();
    // console.log(this.orderData);
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  get_orders() {
    this.orderService.get_buyer_order_list().subscribe((res) => {
      this.orderData = res.data;
      // console.log(this.orderData);
    });
  }
}
