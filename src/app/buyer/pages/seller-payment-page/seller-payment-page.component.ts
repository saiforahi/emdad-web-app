import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { VatService } from '../../../shared/services/vat.service';

@Component({
  selector: 'app-seller-payment-page',
  templateUrl: './seller-payment-page.component.html',
  styleUrls: ['./seller-payment-page.component.css'],
})
export class SellerPaymentPageComponent implements OnInit {
  selectedPlan;
  couponDiscount;
  vatAmmount;

  constructor(
    private subscriptions: SubscriptionService,
    private vat: VatService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedPlan = {
      id: localStorage.getItem('selectedPlanId'),
      subscription_plan: localStorage.getItem('selectedPlanTitle'),
      fees: localStorage.getItem('selectedPlanFees'),
    };
    // this.selectedPlan = 1;
    this.couponDiscount = localStorage.getItem('couponDiscount');
    this.vat.getVat().subscribe((item) => {
      console.log(item.data);
      this.vatAmmount = item.data[0].percentage;
    });
  }

  proceedTopay() {
    const calcullatedVat =
      ((this.selectedPlan.fees - this.couponDiscount) * this.vatAmmount) / 100;
    console.log(calcullatedVat);
    this.subscriptions
      .subscribeToPlan(
        this.selectedPlan.fees,
        1,
        1,
        this.couponDiscount,
        calcullatedVat,
        localStorage.getItem('uid'),
        this.selectedPlan.id,
        localStorage.getItem('couponId'),
        localStorage.getItem('uid')
      )
      .subscribe((item) => {
        console.log(item);
        if (item != undefined) {
          localStorage.removeItem('selectedPlanId');
          localStorage.removeItem('selectedPlanTitle');
          localStorage.removeItem('selectedPlanFees');
          localStorage.removeItem('couponDiscount');
          localStorage.removeItem('couponId');
          localStorage.removeItem('uid');
          this.router.navigate(['/subscription/plans/history']);
        }
      });
  }
}
