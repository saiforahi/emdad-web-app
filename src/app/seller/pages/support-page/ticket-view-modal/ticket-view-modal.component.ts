import { Component, OnInit, Inject } from '@angular/core';
import { TicketService } from '../../../../shared/services/ticket.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-view-modal',
  templateUrl: './ticket-view-modal.component.html',
  styleUrls: ['./ticket-view-modal.component.css']
})
export class TicketViewModalComponent implements OnInit {
  issueData;
  selectedIssueId: any;
  selectedIssueData: any;
  status = ['Running', 'Solved'];
  adminResponse: any;
  constructor(
    private ticketService: TicketService,

    @Inject(MAT_DIALOG_DATA) data: { uId: any, issues: any }) {
    // GET CORRESPONDING ISSUES DETAIL FROM PARENT COMPONENT
    this.issueData = data.issues;
    console.log("issues:", this.issueData)
  }

  ngOnInit(): void {
    //GET ADMIN RESPONSE FOR RESPECTIVE ISSUES
    this.adminResponse = this.issueData.issues;
    console.log("admin", this.adminResponse);

  }

}
