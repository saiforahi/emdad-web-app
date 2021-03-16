import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenTicketModalComponent } from './open-ticket-modal/open-ticket-modal.component';
import { TicketViewModalComponent } from './ticket-view-modal/ticket-view-modal.component';
import { TicketService } from '../../../shared/services/ticket.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';


@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.css']
})
export class SupportPageComponent implements OnInit {
  /**INITIALIZING VARIABLES */
  userId: any;
  toggleSort = true;
  supportIssues: any;
  status = ['Initiative', 'Undergoing', 'Resolved'];
  filterArray:any=[];
  /** Initializing table coloumns */
  displayedColoumns: string[] = ['Report ID', 'Subject', 'Status', 'View'];
 
  constructor(
    public dialog: MatDialog,
    private ticketService: TicketService,
    private router: Router,
    private user: UserAuthService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('s_uid');

    /** API CALL FOR SHOWING ALL TICKETS FOR THAT SELLER */
    this.ticketService.getTickets(localStorage.getItem("s_uid")).subscribe((data: any) => {
      //console.log(data.data[0].image.split('/')[]);
      this.supportIssues = data.data;
      console.log("issues from seller:", this.supportIssues);
    });
  }

  /** SORT TABLE ASC DESC */
  sortTable(value){
   
    if (this.toggleSort) {
      value.sort((a, b) => (a.status>b.status?1 : -1));
      this.toggleSort = !this.toggleSort;
     
    } else {
     value.sort((a, b) => (a.status<b.status?1 : -1));
      this.toggleSort = !this.toggleSort;
    
    }
  }
  /** VIEW TICKET/ISSUE DETAILS MODAL */
  ticketView(id) {
    const dialogRef = this.dialog.open(TicketViewModalComponent, {
      autoFocus: false,
      data: {
        uId: this.userId,
        issues: id,
        
       

      },
    });

  }
  /** OPEN A NEW ISSUE */
  openTicket() {
    const dialogRef = this.dialog.open(OpenTicketModalComponent, {
      autoFocus: false,
      data: {},
    });

  }

}
