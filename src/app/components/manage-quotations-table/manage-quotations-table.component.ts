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
  quotations:any[]=[]
  @Output()quotation=new EventEmitter<Quotation>();
  constructor(private quotationService: QuotationService) {}

  ngOnInit(): void {
    this.get_quotation_list();
  }
  show_quotation_details(quotation:Quotation){
    this.quotation.emit(quotation);
  }
  get_quotation_list(){
    this.quotationService.get_user_quotation_list().subscribe(
      (success)=>{console.log(success.data);this.quotations=success.data},
      (error)=>{}
    )
  }
}
