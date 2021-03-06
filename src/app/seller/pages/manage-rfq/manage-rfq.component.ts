import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewDialogueComponent } from './view-dialogue/view-dialogue.component';

export interface PeriodicElement {
  id: number;
  d_date: string;
  status: string;
  buyer: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1,d_date: '12/13/21',status: 'delivered', buyer: 'hamza'},
  {id: 2,d_date: '12/13/21',status: 'delivered', buyer: 'hamza'},
  {id: 3,d_date: '12/13/21',status: 'delivered', buyer: 'hamza'},
  {id: 4,d_date: '12/13/21',status: 'delivered', buyer: 'hamza'},
  {id: 5,d_date: '12/13/21',status: 'delivered', buyer: 'hamza'},
];

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.component.html',
  styleUrls: ['./manage-rfq.component.css']
})
export class ManageRfqComponent implements OnInit {
 

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['id', 'd_date', 'status', 'buyer','view'];
  dataSource = ELEMENT_DATA;
  openDialog() {
    const dialogRef = this.dialog.open(ViewDialogueComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
