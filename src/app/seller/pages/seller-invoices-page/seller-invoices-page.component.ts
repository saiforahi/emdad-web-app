import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceViewModalComponent } from './invoice-view-modal/invoice-view-modal.component';
import { OrderService } from '../../../shared/services/order.service'
import { PageEvent } from '@angular/material/paginator';
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
  selector: 'app-seller-invoices-page',
  templateUrl: './seller-invoices-page.component.html',
  styleUrls: ['./seller-invoices-page.component.css']
})
export class SellerInvoicesPageComponent implements OnInit {
  invoices:Array<any>=[]
  lowValue: number = 0;
  highValue: number = 5;
  constructor(public dialog: MatDialog, private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.get_invoices_for_seller().subscribe(
      (success)=>{this.invoices=success.data; console.log(success.data)},
      (error) => {console.log(error)}
    )
  }

  displayedColumns: string[] = [
    'Invoice ID',
    'Payment Date',
    'Amount',
    'view'
  ];

  openDialog(invoice:any) {
    const dialogRef = this.dialog.open(InvoiceViewModalComponent, {
      autoFocus: false,
      data: {invoice:invoice},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  formatDate(date:string):string{
    return new Date(date).toDateString()
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}
