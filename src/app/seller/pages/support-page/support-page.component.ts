import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenTicketModalComponent } from './open-ticket-modal/open-ticket-modal.component';
import { TicketViewModalComponent } from './ticket-view-modal/ticket-view-modal.component';
import { TicketService } from '../../../shared/services/ticket.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { PageEvent } from '@angular/material/paginator';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import swal from 'sweetalert';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.css'],
})
export class SupportPageComponent implements OnInit {
  /**INITIALIZING VARIABLES */
  userId: any;
  toggleSort = true;
  supportIssues: any;
  status = ['Initiative', 'Undergoing', 'Resolved'];
  filterArray: any = [];
  lowValue: number = 0;
  highValue: number = 10;
  prodEnd: boolean = false;
  nextBatchProdLink: any;
  filtered_data: any;
  /** Initializing table coloumns */
  
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  constructor(
    public dialog: MatDialog,
    private ticketService: TicketService,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService
  ) {
    this.authService.sellerIsApproved(localStorage.getItem("s_uid")).subscribe((item: any) => {
      console.log(item)
      // Approved User, User Not Approve
      this.subscription.isSubscribed().subscribe((item2: any) => {
        console.log(item2)
        // User Not Subscribe, Subscribe User
        if (item.message != 'Approved User' && item2.message != 'Subscribe User') {
          this.router.navigate(['/dashboard/welcome']);
        } else if (item.message == 'Approved User' && item2.message != 'Subscribe User') {
          swal('Access Denied!', "you are not subscribed to any plan! Please subscribe.", 'error');
          this.router.navigate(['/dashboard/subscription-plan']);
        }
      })
    })
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('s_uid');

    /** API CALL FOR SHOWING ALL TICKETS FOR THAT SELLER */
    this.ticketService
      .getTickets(localStorage.getItem('s_uid'))
      .subscribe((data: any) => {
        //console.log(data.data[0].image.split('/')[]);
        this.supportIssues = data.data;
     this.filtered_data = data.data;
        console.log('issues from seller:', this.supportIssues);
      });
  }

  /** SORT TABLE ASC DESC */
  sortTable(value) {
    if (this.toggleSort) {
      value.sort((a, b) => (a.status > b.status ? 1 : -1));
      this.toggleSort = !this.toggleSort;
    } else {
      value.sort((a, b) => (a.status < b.status ? 1 : -1));
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
    dialogRef.afterClosed().subscribe((result) =>{
      this.ngOnInit()
    })
  }
  filter_tickets(status:number){
    this.supportIssues=[];
  this.filtered_data.forEach(element =>{
    if(element.status == status){
      this.supportIssues.push(element);
    }
  })

  }
}
