import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewDialogueComponent } from './view-dialogue/view-dialogue.component';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import{PageEvent} from '@angular/material/paginator'
import { config } from 'src/config';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.component.html',
  styleUrls: ['./manage-rfq.component.css']
})
export class ManageRfqComponent implements OnInit {
  //INITIALIZATION
  rfqTableData: any;
  lowValue: number = 0;
  highValue: number = 10;
  toggleSort = true;
  img_base_url=config.img_base_url
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private rfq: QuotationService,
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
          swal('Failed!', "you are not subscribed to any plan! Please subscribe.", 'error');
          this.router.navigate(['/dashboard/subscription-plan']);
        }
      })
    })
  }

  ngOnInit(): void {
       // RFQ table data
       this.rfq.get_seller_quotation_list().subscribe(item => {
        // console.log(item);
        this.rfqTableData = item.data;
        console.log("RFQ table Data",this.rfqTableData);
      })

  }
 
  //OPEN THE DIALOG FOR VIEWING RFQ DETAILS
  openDialog(item) {
    const dialogRef = this.dialog.open(ViewDialogueComponent,{
      autoFocus: false,
      data:{
        rfqDetails:item,
      }
    });
    
  }
  //Sort by date or time
  sortTable() {
    if (this.toggleSort) {
      this.rfqTableData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.toggleSort = !this.toggleSort;
      return this.rfqTableData;
    } else {
      this.rfqTableData.sort((b, a) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      this.toggleSort = !this.toggleSort;
      return this.rfqTableData;
    }
  }

}
