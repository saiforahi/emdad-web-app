import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-manage-quotations-table',
  templateUrl: './manage-quotations-table.component.html',
  styleUrls: ['./manage-quotations-table.component.css'],
})
export class ManageQuotations implements OnInit {
  
  constructor(private orders: OrderService) {}

  ngOnInit(): void {}
}
