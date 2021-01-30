import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Quotation } from '../quotation-details-modal/quotation';

@Component({
  selector: 'app-manage-quotations-table',
  templateUrl: './manage-quotations-table.component.html',
  styleUrls: ['./manage-quotations-table.component.css'],
})
export class ManageQuotations implements OnInit {
  quotation_to_show:Quotation;
  
  constructor(private orders: OrderService) {}

  ngOnInit(): void {}
}
