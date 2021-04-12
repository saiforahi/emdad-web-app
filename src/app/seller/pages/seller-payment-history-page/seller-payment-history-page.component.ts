import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-seller-payment-history-page',
  templateUrl: './seller-payment-history-page.component.html',
  styleUrls: ['./seller-payment-history-page.component.css'],
})
export class SellerPaymentHistoryPageComponent implements OnInit {
  subscriptionHistory: any;
  //code for pagination
  lowValue: number = 0;
  highValue: number = 10;
  toggleSort = true;
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  constructor(
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
    this.subscription.subscriptionHistory().subscribe((items) => {
      console.log(items);
      this.subscriptionHistory = items.data[0];
      console.log(this.subscriptionHistory);
    });
  }

  // dataSource = ELEMENT_DATA;
}
