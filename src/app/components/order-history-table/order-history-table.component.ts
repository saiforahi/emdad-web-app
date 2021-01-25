import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-order-history-table',
  templateUrl: './order-history-table.component.html',
  styleUrls: ['./order-history-table.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  
  constructor(private orders: OrderService) {}

  ngOnInit(): void {}
}
