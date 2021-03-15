import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewDialogueComponent } from './view-dialogue/view-dialogue.component';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import{PageEvent} from '@angular/material/paginator'


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
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  displayedColumns: string[] = ['id', 'date', 'status', 'buyer','view'];
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private rfq: QuotationService
  ) { }

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

}
