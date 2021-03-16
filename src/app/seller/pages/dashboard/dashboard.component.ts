import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rfqTableData: any;
  displayedColumns: string[] = ['RFQ ID', 'Date', 'Status'];
  displayedColumns2: string[] = ['Quotation ID', 'Date', 'RFQ ID', 'Status'];
  OrderTableData: any;
  displayedOrderColumns: string[] = ['Order ID', 'Payment Date', 'Delivery Date', 'Amount'];
  displayedOrderColumns2: string[] = ['Order ID', 'Payment Date', 'Delivery Date', 'Status', 'Amount'];
  dataSource = ELEMENT_DATA;

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
