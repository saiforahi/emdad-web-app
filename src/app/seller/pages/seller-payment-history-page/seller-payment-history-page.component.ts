import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
// ];

@Component({
  selector: 'app-seller-payment-history-page',
  templateUrl: './seller-payment-history-page.component.html',
  styleUrls: ['./seller-payment-history-page.component.css']
})
export class SellerPaymentHistoryPageComponent implements OnInit {
  subscriptionHistory: any;

  constructor(private subscription: SubscriptionService, ) { }

  ngOnInit(): void {
    this.subscription.subscriptionHistory().subscribe(items => {
      console.log(items);
      this.subscriptionHistory = items.data[0];
    })
  }

  displayedColumns: string[] = ['Payment Date', 'Subscription Plan Name', 'Expired Date'];
  // dataSource = ELEMENT_DATA;

}
