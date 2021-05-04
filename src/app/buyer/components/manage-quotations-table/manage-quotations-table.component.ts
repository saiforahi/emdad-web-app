import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { QuotationService } from '../../../shared/services/quotation.service';
import { Quotation } from '../../../shared/models/quotation.model';
import { Quotations } from '../../../shared/models/mocks/Quotations';
import { GetProductService } from 'src/app/shared/services/get-product.service';
import { PageEvent } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { BuyerQuotationViewComponent } from '../buyer-quotation-view/buyer-quotation-view.component';
@Component({
  selector: 'app-manage-quotations-table',
  templateUrl: './manage-quotations-table.component.html',
  styleUrls: ['./manage-quotations-table.component.css'],
})
export class ManageQuotations implements OnInit {
  quotation_to_show: Quotation;
  quotationData:Array<any>=[];
  quotationDetails;
  quotation: any;
  status = ['Initiated', 'Sent', 'Completed'];
  displayedColumns: string[] = [
    'Quotation ID',
    'Date',
    'RFQ ID',
    'Seller Name',
    'status',
    'view',
  ];

  lowValue: number = 0;
  highValue: number = 5;

  constructor(
    private quotationService: QuotationService,
    private productService: GetProductService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.get_quotation_list();
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

 /*  show_quotation_details(i) {
    this.quotation = this.quotationDetails[i];
    this.quotation.unit_price = this.quotation.product.unit_price;
  this.quotation.total_price =
   parseFloat(this.quotation.unit_price) *
    parseFloat(this.quotation.quantity);
    document.getElementById('quotationDetails').style.display = 'block';
  }
 */
//open the dialogue for viewing quotation details
  show_quotation_details(item){
    const dialogRef = this.dialog.open(BuyerQuotationViewComponent,{
      autoFocus:false,
      data:{
        quoteDetails:item,
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit()
    });
  }
  get_quotation_list() {
    this.quotationService.get_user_quotation_list().subscribe(
      (success) => {
        this.quotationData = success.data;
        console.log('quotations',this.quotationData);
        this.quotationDetails = [];
        for (var i = 0; i < this.quotationData.length; i++) {
          this.quotationService
            .get_quotation_details(this.quotationData[i].id)
            .subscribe((data) => {
              this.quotationDetails.push(data.data);
            });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

 
  formatDate(date) {
    let d = new Date(date);
    return d.toDateString();
  }
}
