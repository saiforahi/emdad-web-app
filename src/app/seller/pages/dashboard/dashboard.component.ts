import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  quotationTableData: Array<any> = [];
  rfqTableData: any;
  currentOrders: Array<any> = [];
  orderHistory:Array<any>=[];


  constructor(
    private rfq: QuotationService,
    private order: OrderService,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService,private notificationService:NotificationService
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
    this.notificationService.getAllNotificationsForBuyer()
    // RFQ table data
    this.rfq.get_seller_quotation_list().subscribe((item) => {
      // console.log(item);
      this.rfqTableData = item.data;
    });


    //quotation data
    this.rfq.get_seller_quotation_list().subscribe(item => {
      console.log("data from item", item);
      item.data.forEach((list: { status: string; }) => {
        if (parseFloat(list.status) > 1) {
          this.quotationTableData.push(list);
        }
      })
    });
    //order history data
this.order.get_seller_order_list().subscribe(
  (success) =>{
    success.data.forEach((element) =>{
      this.orderHistory.push({});
    });
    this.orderHistory = success.data;
  },
  (error) => {
    console.log(error);
  }

);
    // current order data
    this.order.get_seller_order_list().subscribe(
      (success) => {
        console.log('response', success.data)
        let temp: Array<any> = [];
        success.data.forEach((element: any) => {
          if (this.decide_status(element) != 5) {
            temp.push(element)
          }
        });
        this.currentOrders = temp;
      },
      (error) => {
        console.log(error)
      }
    )
  }
  decide_status(order: any) {
    let temp = []
    order.order.tracking_order.forEach(element => {
      if (element.order == order.order.id) {
        temp.push(element)
      }
    });
    let min_status = temp[0].status
    temp.forEach((item) => {
      if (item.status < min_status && item.seller == localStorage.getItem('s_uid')) {
        min_status = item.status
      }
    })
    return min_status
  }
  //date format helper
  formatDate(date: string) {
    if (date != null) {
      return new Date(date).toDateString()
    }
    return '-'
  }
}
