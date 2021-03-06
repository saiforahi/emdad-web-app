import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderViewModalComponent } from './order-view-modal/order-view-modal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 1},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 2},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 3},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 4},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 5},
];

@Component({
  selector: 'app-current-orders-page',
  templateUrl: './current-orders-page.component.html',
  styleUrls: ['./current-orders-page.component.css']
})
export class CurrentOrdersPageComponent implements OnInit {

  constructor(
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status', 'edit'];
  dataSource = ELEMENT_DATA;

  openDialog() {
    const dialogRef = this.dialog.open(OrderViewModalComponent, {
      autoFocus: false,
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
