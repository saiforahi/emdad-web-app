import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [WebsocketService, NotificationService],
})
export class DashboardComponent implements OnInit {
  rfqTableData: any;
  OrderTableData: any;
  private message = {
    author: 'tutorialedge',
    message: 'this is a test message',
  };

  constructor(
    private rfq: QuotationService,
    private oredr: OrderService,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService,
    private notification: NotificationService
  ) {
    this.authService
      .sellerIsApproved(localStorage.getItem('s_uid'))
      .subscribe((item: any) => {
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
    notification.messages.subscribe((msg) => {
      console.log('Response from websocket: ' + msg);
    });
  }

  ngOnInit(): void {
    // RFQ table data
    this.rfq.get_seller_quotation_list().subscribe((item) => {
      // console.log(item);
      this.rfqTableData = item.data;
    });
    // order table data
    this.oredr
      .getSellerOrders(localStorage.getItem('s_uid'))
      .subscribe((item: any) => {
        // console.log(item);
        this.OrderTableData = item.data;
      });
  }

  sendMsg() {
    console.log('new message from client to websocket: ', this.message);
    this.notification.messages.next(this.message);
    this.message.message = '';
  }
}
