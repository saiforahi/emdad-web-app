import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../../shared/services/subscription.service'
@Component({
  selector: 'app-payment-history-page',
  templateUrl: './payment-history-page.component.html',
  styleUrls: ['./payment-history-page.component.css']
})
export class PaymentHistoryPageComponent implements OnInit {
  subscriptionList:any=[]
  subscriptionPlans:any=[]
  constructor(private subscriptionService:SubscriptionService) { }

  ngOnInit(): void {
    this.subscriptionService.subscriptionHistory().subscribe(
      (success)=>{
        console.log(success.data[0])
        this.subscriptionList=success.data[0]
      }
    )
    this.subscriptionService.plans().subscribe(
      (success)=>{
        console.log(success.data[0])
        this.subscriptionPlans=success.data[0]
      }
    )
  }
  get_subscription_name(subscription_id){
    let result:string;
    this.subscriptionPlans.forEach(plan => {
        if(plan.id==subscription_id){
          result=plan.title;
        }
    });
    return result;
  }
}
