import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryModalComponent } from './order-history-modal/order-history-modal.component';
import {OrderService} from '../../../shared/services/order.service'
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 1 },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 2 },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 1 },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 1 },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 2 },
];

@Component({
  selector: 'app-seller-order-history-page',
  templateUrl: './seller-order-history-page.component.html',
  styleUrls: ['./seller-order-history-page.component.css'],
})
export class SellerOrderHistoryPageComponent implements OnInit {
  orders:Array<any>=[]
  constructor(public dialog: MatDialog, private orderService:OrderService) {

  }

  ngOnInit(): void {
    console.log('hi')
    this.orderService.get_seller_order_list().subscribe(
      (success)=>{
        console.log('orders',success.data)
        this.orders=success.data
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'status',
    'edit',
  ];
  dataSource = ELEMENT_DATA;

  openDialog() {
    const dialogRef = this.dialog.open(OrderHistoryModalComponent, {
      autoFocus: false,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
