import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rfqTableData: any;
  
  OrderTableData: any;

  

  constructor(private user: UserAuthService, private rfq: QuotationService, private oredr: OrderService) { }

  ngOnInit(): void {
    // RFQ table data
    this.rfq.get_seller_quotation_list().subscribe(item => {
      // console.log(item);
      this.rfqTableData = item.data;
    })
    // order table data
    this.oredr.getSellerOrders(localStorage.getItem("s_uid")).subscribe((item: any) => {
      // console.log(item);
      this.OrderTableData = item.data;
    })
  }

}
