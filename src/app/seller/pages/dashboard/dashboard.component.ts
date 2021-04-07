import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  rfqTableData: any;
  OrderTableData: any;

  constructor(
    private rfq: QuotationService,
    private oredr: OrderService,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService
  ) {
    this.authService.sellerIsApproved(localStorage.getItem("s_uid")).subscribe((item: any) => {
      console.log(item)
      // Approved User, User Not Approve
      this.subscription.isSubscribed().subscribe((item2: any) => {
        console.log(item2)
        // User Not Subscribe, Subscribe User
        if (item.message != 'Approved User' && item2.message != 'Subscribe User') {
          console.log("condition 1")
          this.router.navigate(['/dashboard/welcome']);
        } else if (item.message == 'Approved User' && item2.message != 'Subscribe User') {
          console.log("condition 2")
          this.router.navigate(['/dashboard/subscription-plan']);
        }
      })
    })
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
}
