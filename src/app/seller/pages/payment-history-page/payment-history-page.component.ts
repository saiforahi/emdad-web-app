import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { SubscriptionService } from '../../../shared/services/subscription.service';
@Component({
  selector: 'app-payment-history-page',
  templateUrl: './payment-history-page.component.html',
  styleUrls: ['./payment-history-page.component.css'],
})
export class PaymentHistoryPageComponent implements OnInit {
  subscriptionList: any = [];
  subscriptionPlans: any = [];
  
  constructor(
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
    this.subscription.subscriptionHistory().subscribe((success) => {
      console.log(success.data[0]);
      this.subscriptionList = success.data[0];
    });
    this.subscription.plans().subscribe((success) => {
      console.log(success.data[0]);
      this.subscriptionPlans = success.data[0];
    });
  }
  get_subscription_name(subscription_id) {
    let result: string;
    this.subscriptionPlans.forEach((plan) => {
      if (plan.id == subscription_id) {
        result = plan.title;
      }
    });
    return result;
  }
}
