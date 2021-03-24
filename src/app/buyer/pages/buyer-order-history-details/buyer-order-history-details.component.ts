import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { config } from 'src/config';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-buyer-order-history-details',
  templateUrl: './buyer-order-history-details.component.html',
  styleUrls: ['./buyer-order-history-details.component.css'],
})
export class BuyerOrderHistoryDetailsComponent implements OnInit {
  order_id: any;
  orders: any;
  base_url: string;
  subTotal: any;
  discount: any;
  vat: any;
  total: any;
  dataLoaded: boolean = false;
  order_status:string;
  product_statuses:Array<any>=[]
  img_base_url;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.base_url = config.base_url;
    this.img_base_url = config.img_base_url;
    this.order_id = this.route.snapshot.params['order_id'];
    this.orderService.get_buyer_order_details(this.order_id).subscribe(
      (success) => {
        console.log(success.data);
        this.orders = success.data;
        this.dataLoaded = true;
        this.get_order_status()
        //this.get_order_status()
      },
      (error) => console.log(error)
    );
  }

  ngOnChanges(changes: SimpleChange): void {
    console.log('changes', changes);
  }

  get_product_status(prod_id){
    let status:string
    this.product_statuses.forEach(product_status=>{
      if(product_status.product==prod_id){
        status=product_status.status
      }
    })
    return status
  }

  get_order_status(){
    if(this.orders?.length>0){
      if(this.orders[0].order.payment_type===1){
        this.order_status="confirmed"
      }
      else{
        this.order_status="placed"
      }
    }
    this.orders[0].order.tracking_order.forEach(element => {
      console.log('status',element.status)
      switch(element.status){
        // case 1:
        //   this.product_statuses.push({product:element.product,status:''})
        //   break
        // case 2:
        //   this.product_statuses.push({product:element.product,status:'confirmed'})
        //   break
        case 3:
          this.product_statuses.push({product:element.product,status:'processing'})
          break
        case 4:
          this.product_statuses.push({product:element.product,status:'delivered'})
          break
        // case 5:
        //   this.product_statuses.push({product:element.product,status:'completed'})
        //   break
      }
    });
    
    console.log("product statuses",this.product_statuses)
    return this.order_status;
  }
  calcTotalPrice() {
    let subTotal = 0;
    this.orders.forEach((element) => {
      subTotal += parseFloat(element.unit_price) * parseFloat(element.quantity);
    });
    this.subTotal = subTotal;
    return subTotal;
  }

  calcDiscount() {
    let total = 0;
    this.orders.forEach((element) => {
      total += parseInt(element.order.discount_coupon_amount);
    });
    this.discount = total;
    return total;
  }

  calVat() {
    let total = 0;
    this.orders.forEach((element) => {
      total += parseInt(element.vat_amount);
    });
    this.vat = total;
    return total;
  }
  calTotal() {
    return this.vat + this.discount + this.subTotal;
  }

  cal_individual_total(index) {
    return this.orders[index].unit_price * this.orders[index].quantity;
  }

  createPdf() {
    var doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Order Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(
      'Date : ' + this.formatDate(this.orders[0].order.order_datetime),
      200,
      20,
      null,
      'right'
    );
    doc.setFontSize(20);
    doc.setFont('Jost', 'normal');
    doc.text('Order ID: # ' + this.orders[0].order.order_code, 20, 30);
    doc.setFontSize(12);
    //doc.text("This is centred text.", 105, 80, null, "center");
    //doc.text("And a little bit more underneath it.", 105, 90, null, "center");
    for (let index = 0; index < this.orders.length; index++) {
      // console.log(this.img_base_url + this.orders[index].product.image1);
      var img = new Image();
      img.src = this.img_base_url + this.orders[index].product.image1;
      doc.addImage(img, 'JPEG', 20, 40 + index * 3 + index * 40, 40, 40);
      doc.text('' + this.orders[index].product.name, 70, 55 + index * 40);
      doc.text('#1009271 (Ex-works)', 70, 65 + index * 40);
      doc.text('' + this.orders[index].quantity, 100, 55 + index * 40);
      doc.text('$ ' + this.cal_individual_total(index), 115, 55 + index * 40);
      //doc.text()
    }

    doc.text(`Sub Total ${this.orders.length} items`, 140, 55);
    doc.text('' + this.calcTotalPrice(), 190, 55, null, 'right');
    doc.text('Discount', 140, 65);
    doc.text('' + this.calcDiscount(), 190, 65, null, 'right');
    doc.text('Vat', 140, 75);
    doc.text('' + this.calVat(), 190, 75, null, 'right');
    doc.line(140, 85, 190, 85);
    doc.text('Total', 140, 95);
    doc.text('' + this.calTotal(), 190, 95, null, 'right');
    // doc.text("Back to left", 20, 120);

    // doc.text("10 degrees rotated", 20, 140, null, 10);
    // doc.text("-10 degrees rotated", 20, 160, null, -10);
    doc.save('invoice_' + this.order_id + '.pdf');
    this.spinner.hide();
  }
  formatDate(date) {
    let d = new Date(date);
    return d.toDateString();
  }
}
