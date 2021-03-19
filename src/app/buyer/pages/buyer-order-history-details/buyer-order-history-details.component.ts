import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { config } from 'src/config';
import { AngularCreatePdfService } from 'angular-create-pdf';
@Component({
  selector: 'app-buyer-order-history-details',
  templateUrl: './buyer-order-history-details.component.html',
  styleUrls: ['./buyer-order-history-details.component.css']
})
export class BuyerOrderHistoryDetailsComponent implements OnInit {
  order_id:any;
  orders:any;
  base_url:string;
  subTotal:any;
  discount:any;
  vat:any;
  total:any;
  img_base_url;
  constructor(private route:ActivatedRoute,private orderService:OrderService,private pdfService: AngularCreatePdfService) { }

  ngOnInit(): void {
    this.base_url=config.base_url;
    this.img_base_url=config.img_base_url
    this.order_id=this.route.snapshot.params['order_id'];
    this.orderService.get_buyer_order_details(this.order_id).subscribe(
      (success)=>{console.log(success.data);this.orders=success.data},
      (error)=>console.log(error)
    )
  }

  calcTotalPrice() {
    let subTotal = 0;
    this.orders.forEach((element) => {
        subTotal += parseFloat(element.unit_price) * parseFloat(element.quantity);
    });
    this.subTotal=subTotal;
    return subTotal;
  }

  calcDiscount(){
    let total=0;
    this.orders.forEach(element => {
      total+= parseInt(element.order.discount_coupon_amount)
    });
    this.discount=total;
    return total;
  }

  calVat(){
    let total=0;
    this.orders.forEach(element => {
      total+=parseInt(element.vat_amount)
    });
    this.vat=total;
    return total;
  }
  calTotal(){
    return this.vat+this.discount+this.subTotal;
  }

  cal_individual_total(index){
    return this.orders[index].unit_price*this.orders[index].quantity
  }
  createPdfTem(ele: any) {
    //this.pdfService.createPdf(ele, 'invoice.pdf');
  }
}
