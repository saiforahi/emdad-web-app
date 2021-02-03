import { Component, Output,EventEmitter, OnInit } from '@angular/core';
import { QuotationService } from '../../shared/services/quotation.service';
import { Quotation } from '../../shared/models/quotation.model';
import {Quotations} from '../../shared/models/mocks/Quotations';
@Component({
  selector: 'app-manage-quotations-table',
  templateUrl: './manage-quotations-table.component.html',
  styleUrls: ['./manage-quotations-table.component.css'],
})
export class ManageQuotations implements OnInit {
  quotation_to_show:Quotation;
  quotations:Quotation[]
  @Output()quotation=new EventEmitter<Quotation>();
  constructor(private quotationService: QuotationService) {}

  ngOnInit(): void {
    this.quotations=Quotations;
  }
  show_quotation_details(quotation:Quotation){
    this.quotation.emit(quotation);
  }
}
