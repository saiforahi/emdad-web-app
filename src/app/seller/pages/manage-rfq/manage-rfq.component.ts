import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewDialogueComponent } from './view-dialogue/view-dialogue.component';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import{PageEvent} from '@angular/material/paginator'
import { config } from 'src/config';


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
