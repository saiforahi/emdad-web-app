import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderViewModalComponent } from './order-view-modal/order-view-modal.component';
import { OrderService } from '../../../shared/services/order.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-current-orders-page',
  templateUrl: './current-orders-page.component.html',
  styleUrls: ['./current-orders-page.component.css'],
})
export class CurrentOrdersPageComponent implements OnInit {
  orders: Array<any> = [];
  selectedOrder: any;
  challan = new FormData();
  toggleSort: boolean = true;
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
    console.log(localStorage.getItem('s_token'));
    console.log(localStorage.getItem('s_uid'));
    this.orderService.get_seller_order_list().subscribe(
      (success) => {
        console.log('response', success.data);
        let temp: Array<any> = [];
        success.data.forEach((element: any) => {
          if (this.decide_status(element) != 5 && element.order.buyer_payment_status == 1 && element.order.is_approved=='0') {
            temp.push(element);
          }
        });
        this.orders = temp;
        this.orders = this.orders.filter(
          (value, index, array) =>
            array.findIndex((t) => t.order.id === value.order.id) === index
        ); //setting distinct orders
        console.log('orders', this.orders);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // dataSource = ELEMENT_DATA;

  openDialog(order: any) {
    const dialogRef = this.dialog.open(OrderViewModalComponent, {
      autoFocus: false,
      data: { order: order },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOrder = result;
      console.log(`Dialog result: ${this.selectedOrder}`);
      this.ngOnInit()
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
  filter_orders(value: any) {
    let temp: Array<any> = [];
    this.orders.forEach((order: any) => {
      console.log(order);
    });
  }

  decide_status(order: any) {
    let temp = [];
    order.order.tracking_order.forEach((element) => {
      if (element.order == order.order.id && element.seller == localStorage.getItem('s_uid')) {
        temp.push(element);
      }
    });
    let min_status = temp[0].status;
    temp.forEach((item) => {
      if (
        item.status < min_status
      ) {
        min_status = item.status;
      }
    });
    return min_status;
  }

  sortTable() {
    if (this.toggleSort) {
      this.orders.sort(
        (a, b) =>
          new Date(b.order.order_datetime).getTime() -
          new Date(a.order.order_datetime).getTime()
      );
      this.toggleSort = !this.toggleSort;
      return this.orders;
    } else {
      this.orders.sort(
        (b, a) =>
          new Date(b.order.order_datetime).getTime() -
          new Date(a.order.order_datetime).getTime()
      );
      this.toggleSort = !this.toggleSort;
      return this.orders;
    }
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
