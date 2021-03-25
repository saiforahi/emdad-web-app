import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/Order.model';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css'],
})
export class TrackOrderComponent implements OnInit {
  orderData:Array<any>=[];
  filtered_orders: any[] = [];
  statuses: string[];
  status = ['Created', 'Confirmed', 'Processing', 'Delivered', 'Completed'];
  displayedColumns: string[] = [
    'Order ID',
    'Payment Date',
    'Amount',
    'status',
    'view',
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // console.log(localStorage.getItem('token'));
    this.get_orders();
  }

  get_orders() {
    this.orderService.get_buyer_order_list().subscribe((result) => {
      console.log(result.data);
      this.orderData = result.data;
      this.filtered_orders = result.data;
      this.get_statuses()
    });
  }

  handle_dropdown() {
    if (
      document.getElementById('filterByStatusDiv').classList.contains('show')
    ) {
      document.getElementById('filterByStatusDiv').classList.remove('show');
    } else {
      document.getElementById('filterByStatusDiv').classList.add('show');
    }
  }

  get_statuses() {
    this.statuses = [];
    this.orderData.forEach((order) => {
      //console.log('order',order.tracking_order[0].status)
      this.statuses.push(order.tracking_order[0].status?order.tracking_order[0].status:'-');
    });
    console.log(this.statuses)
  }

  change_filter_value(value) {
    this.filtered_orders = [];
    this.orderData.forEach((order) => {
      // console.log('selected value:',value)
      // console.log('order',order.tracking_order[0].status)
      if (order.tracking_order[0].status == value) {
        // console.log('if block');
        this.filtered_orders.push(order);
      }
    });
    // console.log(this.filtered_orders);
  }

  get_status(value) {
    let status;
    switch (value) {
      case 1:
        status = 'Created';
        break;
      case 2:
        status = 'Confirmed';
        break;
      case 3:
        status = 'Processing';
        break;
      case 4:
        status = 'Delivered';
        break;
      case 5:
        status = 'Completed';
        break;
      default:
        status = '-';
        break;
    }
    return status;
  }
}
