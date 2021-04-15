import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css'],
})
export class TrackOrderComponent implements OnInit {
  orderData:Array<any>=[];
  filtered_orders:Array<any> = [];
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
    this.filtered_orders=[]
    this.orderData=[]
    this.orderService.get_buyer_order_list().subscribe((result) => {
      console.log('orders from response',result.data);
      result.data.forEach(element => {
        if(element.payment_type==1 && element.buyer_payment_status==1){
          this.orderData.push(element)
        }
        else if(element.payment_type==0){
          this.orderData.push(element)
        }
      });
      this.filtered_orders=this.orderData
      console.log('orders',this.filtered_orders);
      this.get_statuses()
    });
  }

  handle_dropdown() {
    if (document.getElementById('filterByStatusDiv').classList.contains('show')) {
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

  change_filter_value(value:number) {
    this.filtered_orders = [];
    console.log('selected value:',value)
    if(value.toString()==="-1"){
      this.filtered_orders=this.orderData
    }
    else{
      this.orderData.forEach((order) => {
        // console.log('selected value:',value)
        // console.log('order',order.tracking_order[0].status)
        if (this.status_master(order) == value) {
          // console.log('if block');
          console.log('matched value',value)
          this.filtered_orders.push(order);
        }
      });
    }
    
  }

  get_status(value:number) {
    let status:string;
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

  status_master(order:any){
    let min_status:number=order.tracking_order[0].status
    order.tracking_order.forEach(element => {
      if(element.status<min_status){
        min_status=element.status
      }
    });
    //console.log('min_status',min_status)
    return min_status
  }
}
