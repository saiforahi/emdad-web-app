import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../shared/services/subscription.service';

@Component({
  selector: 'app-seller-subscription-history-page',
  templateUrl: './seller-subscription-history-page.component.html',
  styleUrls: ['./seller-subscription-history-page.component.css'],
})
export class SellerSubscriptionHistoryPageComponent implements OnInit {
  planHistory;

  constructor(
    private subscriptions: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions
      .subscriptionHistory(localStorage.getItem('uid'))
      .subscribe((item) => {
        this.planHistory = item.data[0];
        console.log(this.planHistory);
      });
  }
}
