import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
@Component({
  selector: 'app-buyer-order-history-details',
  templateUrl: './buyer-order-history-details.component.html',
  styleUrls: ['./buyer-order-history-details.component.css']
})
export class BuyerOrderHistoryDetailsComponent implements OnInit {
  order_id:any;
  order_details:any;
  constructor(private route:ActivatedRoute,private orderService:OrderService) { }

  ngOnInit(): void {
    this.order_id=this.route.snapshot.params['id'];
    this.orderService.get_buyer_order_details(this.order_id).subscribe(
      (success)=>console.log(success),
      (error)=>console.log(error)
    )
  }

}
