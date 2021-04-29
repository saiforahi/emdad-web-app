import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryModalComponent } from './order-history-modal/order-history-modal.component';
import { OrderService } from '../../../shared/services/order.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';



@Component({
  selector: 'app-seller-order-history-page',
  templateUrl: './seller-order-history-page.component.html',
  styleUrls: ['./seller-order-history-page.component.css'],
})
export class SellerOrderHistoryPageComponent implements OnInit {
  orders: Array<any> = [];
  filtered_orders: Array<any> = [];
  lowValue: number = 0;
  highValue: number = 5;

  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService
  ) {
    
    this.authService.s_uId.subscribe((s_uid) => {
      console.log(s_uid);
      if (s_uid != null) {
        this.authService.sellerIsApproved(s_uid).subscribe((item: any) => {
          console.log(item);
          // Approved User, User Not Approve
          this.subscription.isSubscribed().subscribe((item2: any) => {
            console.log(item2);
            // User Not Subscribe, Subscribe User
            if (
              item.message != 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              this.router.navigate(['/dashboard/welcome']);
            } else if (
              item.message == 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              swal(
                'Access Denied!',
                'you are not subscribed to any plan! Please subscribe.',
                'error'
              );
              this.router.navigate(['/dashboard/subscription-plan']);
            }
          });
        });
      }
    });
  }

  ngOnInit(): void {
    console.log('hi');
    this.orderService.get_seller_order_list().subscribe(
      (success) => {
        console.log('orders', success.data);
        success.data.forEach((element) => {
          if(element.order.buyer_payment_status==1 && element.order.is_approved=='0'){
            this.orders.push(element);
          }
        });
        this.orders = this.orders.filter(
          (value, index, array) =>
            array.findIndex((t) => t.order.id === value.order.id) === index
        ); //setting distinct orders
        this.filtered_orders = this.orders;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //dataSource = ELEMENT_DATA;

  openDialog(order: any) {
    const dialogRef = this.dialog.open(OrderHistoryModalComponent, {
      autoFocus: false,
      data: { order: order },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.ngOnInit()
    });
  }
  //filtering for orders according to status
 
  filter_data(orders: Array<any>) {
    let temp: Array<any> = [];
    orders.forEach((order) => {
      let completed: boolean = true;
      order.order.tracking_order.forEach((item: any) => {
        if (item.status != 5) {
        }
      });
    });
  }
  //date format helper
  formatDate(date: string) {
    if (date != null) {
      return new Date(date).toDateString();
    }
    return '-';
  }

  //filtering orders
  filter_orders(value: number) {
    this.filtered_orders = [];
    this.orders.forEach((order: any) => {
      if (order.order.seller_payment_status ==value ) {
        console.log('type', order.order.payment_type);
        this.filtered_orders.push(order);
      }
    });
    // if (value == 1) {
    //   this.orders.forEach((order: any) => {
    //     if (
    //       order.order.payment_type === 1 &&
    //       order.order.order_payment.length > 0
    //     ) {
    //       console.log('type', order.order.payment_type);
    //       this.filtered_orders.push(order);
    //     }
    //   });
    // } else if (value == 0) {
    //   this.orders.forEach((order: any) => {
    //     if (order.order.payment_type === 0) {
    //       console.log('type', order.order.payment_type);
    //       this.filtered_orders.push(order);
    //     }
    //   });
    // } else {
    //   this.filtered_orders = this.orders;
    // }
  }
  get_price(id: any) {
    // this.orderService.get_seller_order_details(id).subscribe(
    //   (success)=>{
    //     return (parseFloat(success.data[0].unit_price)*parseFloat(success.data[0].quantity))+parseFloat(success.data[0].commission)+parseFloat(success.data[0].vat_amount)
    //   }
    // )
    //return (parseFloat(unit_price)*parseFloat(quantity))+parseFloat(commission)+parseFloat(vat_amount)
  }
  get_total() {
    let total: number = 0;
    this.orders.forEach((order: any) => {
      total += parseFloat(order.order.total_amount);
    });
    return total.toFixed(2);
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
