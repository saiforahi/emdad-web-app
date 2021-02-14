import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { UserAuthService } from '../../../shared/services/user-auth.service';

@Component({
  selector: 'app-seller-orders-page',
  templateUrl: './seller-orders-page.component.html',
  styleUrls: ['./seller-orders-page.component.css']
})
export class SellerOrdersPageComponent implements OnInit {
  orderList;
  userId: any;

  constructor(private usetAuth: UserAuthService, private orders: OrderService) { }

  ngOnInit(): void {
    this.usetAuth.uId.subscribe(item =>{
      this.userId = item;
    })
    this.orders.getSellerOrders(this.userId).subscribe(item =>{
      console.log(item);
      this.orderList = item;
    });
    this.orders.statusUpdated.subscribe(item =>{
      if(item == true){
        this.ngOnInit();
        this.orders.statusUpdated.next(false);
      }
    })
  }

}
