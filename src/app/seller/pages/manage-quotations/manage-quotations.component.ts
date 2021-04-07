import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuotationViewModalComponent } from './quotation-view-modal/quotation-view-modal.component';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
//import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-quotations',
  templateUrl: './manage-quotations.component.html',
  styleUrls: ['./manage-quotations.component.css']
})

export class ManageQuotationsComponent implements OnInit {
//INITIALIZATION
quotationData: any;
status = ['Initiative', 'Sent', 'Completed'];
filtered_data:Array<any>=[]
lowValue: number = 0;
highValue: number = 5;
displayedColumns: string[] = ['qid', 'date', 'rfq_id', 'status', 'buyer','view'];

  constructor(
    public dialog: MatDialog,
    private quote: QuotationService,
    private router: Router,
    //private paginator: MatPaginator,
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
          console.log("condition 1")
          this.router.navigate(['/dashboard/welcome']);
        } else if (item.message == 'Approved User' && item2.message != 'Subscribe User') {
          console.log("condition 2")
          this.router.navigate(['/dashboard/subscription-plan']);
        }
      })
    })
  }

  ngOnInit(): void {
     // RFQ table data
     this.quote.get_seller_quotation_list().subscribe(item => {
      // console.log(item);
      this.quotationData = item.data;
      this.filtered_data=this.quotationData
      console.log("Quotations",this.quotationData);

    })
  }

  openDialog(quotation) {
    console.log('open dialog data',quotation)
    const dialogRef = this.dialog.open(QuotationViewModalComponent, {
      autoFocus: false,
      data: {quotation:quotation}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  filter_quotations(status:number){
    this.filtered_data=[]
    this.quotationData.forEach(element => {
      if(element.status==status){
        this.filtered_data.push(element)
      }
    });
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  formatDate(date:string){
    if(date!=null){
      return new Date(date).toDateString()
    }
    return '-'
  }

}
