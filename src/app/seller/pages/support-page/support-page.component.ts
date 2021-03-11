import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenTicketModalComponent } from './open-ticket-modal/open-ticket-modal.component';
import { TicketViewModalComponent } from './ticket-view-modal/ticket-view-modal.component';
import { TicketService } from '../../../shared/services/ticket.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  status: number;
} */

/* const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 1 },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 2 },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 1 },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 1 },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 2 },
];
 */
@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.css']
})
export class SupportPageComponent implements OnInit {
userId:any;
supportIssues:any;
/** Initializing table coloumns */
displayedColoumns:string[]=['Report ID','Subject','Status','View'];
  constructor(
    public dialog: MatDialog,
    private ticketService: TicketService,
    private router: Router,
    private user:UserAuthService) { }

  ngOnInit(): void {
   this.userId = localStorage.getItem('s_uid');
   /*  if (this.userId == null) {
      this.router.navigate(['/']);
    } */
    this.ticketService.getTickets(localStorage.getItem("s_uid")).subscribe((data:any) => {
      //console.log(data.data[0].image.split('/')[]);
      this.supportIssues = data.data;
      console.log("issues from seller:",this.supportIssues);
    });
  }



  ticketView() {
    const dialogRef = this.dialog.open(TicketViewModalComponent, {
      autoFocus: false,
      data: {uId:this.userId},
    });
  /*   dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

  openTicket() {
    const dialogRef = this.dialog.open(OpenTicketModalComponent, {
      autoFocus: false,
      data: {},
    });
 /*    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

}
