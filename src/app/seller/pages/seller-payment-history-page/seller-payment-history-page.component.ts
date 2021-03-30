import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import{PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-seller-payment-history-page',
  templateUrl: './seller-payment-history-page.component.html',
  styleUrls: ['./seller-payment-history-page.component.css']
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
  constructor(private subscription: SubscriptionService, ) { }

  ngOnInit(): void {
    this.subscription.subscriptionHistory().subscribe(items => {
      console.log(items);
      this.subscriptionHistory = items.data[0];
      console.log(this.subscriptionHistory);
    })
  }

 
  // dataSource = ELEMENT_DATA;

}
