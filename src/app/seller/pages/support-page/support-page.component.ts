import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OpenTicketModalComponent } from './open-ticket-modal/open-ticket-modal.component';
import { TicketViewModalComponent } from './ticket-view-modal/ticket-view-modal.component';

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
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.css']
})
export class SupportPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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

  ticketView() {
    const dialogRef = this.dialog.open(TicketViewModalComponent, {
      autoFocus: false,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openTicket() {
    const dialogRef = this.dialog.open(OpenTicketModalComponent, {
      autoFocus: false,
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
