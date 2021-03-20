import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { QuotationService } from '../../../shared/services/quotation.service';
import { Quotation } from '../../../shared/models/quotation.model';
import { Quotations } from '../../../shared/models/mocks/Quotations';
import { GetProductService } from 'src/app/shared/services/get-product.service';
@Component({
  selector: 'app-manage-quotations-table',
  templateUrl: './manage-quotations-table.component.html',
  styleUrls: ['./manage-quotations-table.component.css'],
})
export class ManageQuotations implements OnInit {
  quotation_to_show: Quotation;
  quotationData;
  quotationDetails: any[] = [];
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

  constructor(
    private quotationService: QuotationService,
    private productService: GetProductService
  ) {}

  ngOnInit(): void {
    this.get_quotation_list();
  }

  show_quotation_details(i) {
    this.quotation = this.quotationDetails[i];
    this.quotation.unit_price = this.quotation.product.unit_price;
    this.quotation.total_price =
      parseFloat(this.quotation.unit_price) *
      parseFloat(this.quotation.quantity);
    document.getElementById('quotationDetails').style.display = 'block';
  }

  get_quotation_list() {
    this.quotationService.get_user_quotation_list().subscribe(
      (success) => {
        this.quotationData = success.data;
        // console.log(this.quotationData);
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

  hideModal() {
    document.getElementById('quotationDetails').style.display = 'none';
  }

  formatDate(date) {
    let d = new Date(date);
    return d.toDateString();
  }
}
