import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuotationViewModalComponent } from './quotation-view-modal/quotation-view-modal.component';
import { QuotationService } from 'src/app/shared/services/quotation.service';
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
displayedColumns: string[] = ['qid', 'date', 'rfq_id', 'status', 'buyer','view'];
  constructor(
    public dialog: MatDialog,
    private quote: QuotationService,
    //private paginator: MatPaginator,
  ) { }

  ngOnInit(): void {
     // RFQ table data
     this.quote.get_seller_quotation_list().subscribe(item => {
      // console.log(item);
      this.quotationData = item.data;
      console.log("RFQ table Data",this.quotationData);

    })
  }

 


  openDialog() {
    const dialogRef = this.dialog.open(QuotationViewModalComponent, {
      autoFocus: false,
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
