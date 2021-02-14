import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.css'],
})
export class OrderDetailsModalComponent implements OnInit {
  @Input() order;
  @Input() status;
  closeResult: string;
  orderDetails: any = [];
  modalReference;

  constructor(private modalService: NgbModal, private orders: OrderService) {}

  ngOnInit(): void {}

  open(content) {
    this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    this.modalReference.result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.orders.SingleOrderDetails(this.order.seller, this.order.order.id).subscribe(item =>{
      console.log(item);
      this.orderDetails = item;
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateOrderStatus(order, status){
    this.orders.orderStatusUpdate(this.order.seller, {order, status}).subscribe(
      (success) => {
        this.status = parseInt(status);
        console.log(this.status)
        this.modalReference.close();
        // alert("Satus Updated successfully!")
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
