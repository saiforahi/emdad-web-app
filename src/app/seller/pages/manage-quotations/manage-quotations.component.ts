import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuotationViewModalComponent } from './quotation-view-modal/quotation-view-modal.component';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import { PageEvent } from '@angular/material/paginator';
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
    //private paginator: MatPaginator,
  ) { }

  ngOnInit(): void {
     // RFQ table data
     this.quote.get_seller_quotation_list().subscribe(item => {
      // console.log(item);
      this.quotationData = item.data;
      this.filtered_data=this.quotationData
      console.log("RFQ table Data",this.quotationData);

    })
  }

  openDialog(quotation) {
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
