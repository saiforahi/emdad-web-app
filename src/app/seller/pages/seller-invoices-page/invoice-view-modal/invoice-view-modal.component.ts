import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {OrderService} from '../../../../shared/services/order.service'


@Component({
  selector: 'app-invoice-view-modal',
  templateUrl: './invoice-view-modal.component.html',
  styleUrls: ['./invoice-view-modal.component.css']
})
export class InvoiceViewModalComponent implements OnInit {
  details:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private orderService:OrderService) { 
    orderService.get_invoice_details_for_seller(this.data.invoice.order).subscribe(
      (success) => {this.details=success.data;console.log('details',this.details)}
    )
  }

  ngOnInit(): void {
    console.log('dialog data',this.data)
  }

 


  formatDate(date:string):string{
    return new Date(date).toDateString()
  }

  get_price(price:string,quantity:string,commission:string,vat_amount:string){
    return (((parseFloat(price) + parseFloat(commission))*Number(quantity)) + parseFloat(vat_amount)).toFixed(2)
  }

  get_total_price(){
    let total=0
    this.details.ordered_product.forEach((product:any) => {
      total+= ((parseFloat(product.unit_price) + parseFloat(product.commission))*Number(product.quantity)) + parseFloat(product.vat_amount)
    });
    return total.toFixed(2)
  }
}
