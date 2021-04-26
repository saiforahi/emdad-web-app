import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute , NavigationEnd, Router} from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { config } from 'src/config';
import { NgxSpinnerService } from 'ngx-spinner';
import jsPDF from 'jspdf';
import swal from 'sweetalert'
import { UrlService } from '../../../shared/services/url.service';
@Component({
  selector: 'app-buyer-order-history-details',
  templateUrl: './buyer-order-history-details.component.html',
  styleUrls: ['./buyer-order-history-details.component.css'],
})
export class BuyerOrderHistoryDetailsComponent implements OnInit {
  invoice = new FormData();
  order_id: any;
  orders: Array<any>=[];
  base_url: string;
  subTotal: any;
  discount: any = 0;
  vat: any = 0;
  total: any;
  dataLoaded: boolean = false;
  order_status: string;
  product_statuses: Array<any> = [];
  img_base_url;
  previousUrl: any;
  trans_totalItems:any;
  selectedImage: any = [];
  admin_bank_info:Array<any>=[]
  file_name:any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private urlService:UrlService,
  ) {
    
  }

  ngOnInit(): void {
    this.base_url = config.base_url;
    this.file_name="PaymentHistory.pdf"
    this.img_base_url = config.img_base_url;
    this.order_id = this.route.snapshot.params['order_id'];
    this.orderService.getAdminBankAccountInfo().subscribe(
      (success)=>{this.admin_bank_info=success.data[0]}
    )
    this.orderService.get_buyer_order_details(this.order_id).subscribe(
      (success) => {
        console.log(success.data);
        this.orders = success.data;
        this.trans_totalItems=this.orders.length
        this.dataLoaded = true;
        this.get_order_status();
        //this.get_order_status()
        this.calVat();
        this.calcDiscount();
        console.log('prev url',this.urlService.getCurrentUrl())
        if(this.urlService.getCurrentUrl()==='/checkout'){
          swal("Placed!",'Upload invoice to get your order confirmed','success')
        }
      },
      (error) => console.log(error)
    );
  }

  ngOnChanges(changes: SimpleChange): void {
    console.log('changes', changes);
  }

  get_product_status(prod_id) {
    let status: string;
    this.product_statuses.forEach((product_status) => {
      if (product_status.product == prod_id) {
        status = product_status.status;
      }
    });
    return status;
  }

  get_order_status() {
    if (this.orders?.length > 0) {
        this.order_status = this.orders[0].order.tracking_order[0].status;
    }
    console.log('order status',this.order_status)
    this.orders[0].order.tracking_order.forEach((element) => {
      console.log('status', element.status);
      if(parseInt(element.status) < parseInt(this.order_status) ){
        this.order_status=element.status
      }
      switch (element.status) {
        // case 1:
        //   this.product_statuses.push({product:element.product,status:''})
        //   break
        // case 2:
        //   this.product_statuses.push({product:element.product,status:'confirmed'})
        //   break
        case 3:
          this.product_statuses.push({
            product: element.product,
            status: 'processing',
          });
          break;
        case 4:
          this.product_statuses.push({
            product: element.product,
            status: 'delivered',
          });
          break;
        case 5:
          this.product_statuses.push({product:element.product,status:'completed'})
          break
      }
    });

    console.log('product statuses', this.product_statuses);
    return this.order_status;
  }

  calcTotalPrice() {
    let subTotal = 0;
    this.orders.forEach((element) => {
      if(parseFloat(element.commission)>0){
        subTotal += (parseFloat(element.unit_price)  + parseFloat(element.commission))* parseFloat(element.quantity);
      }
      else{
        subTotal += (parseFloat(element.unit_price)  + parseFloat(localStorage.getItem('commission')))* parseFloat(element.quantity);
      }
      
    });
    this.subTotal = subTotal;
    return subTotal;
  }

  calcDiscount() {
    let total = 0;
    total = parseFloat(this.orders[0].order.discount_coupon_amount);
    this.discount = total;
    return total.toFixed(2);
  }

  calVat() {
    let total = 0;
    this.orders.forEach((element) => {
      total += parseFloat(element.vat_amount);
    });
    this.vat = total;
    return total.toFixed(2);
  }

  calTotal() {
    return this.vat - this.discount + this.subTotal;
  }

  cal_individual_total(index:number) {
    if(parseFloat(this.orders[index].commission)>0){
      //let price=parseFloat(this.orders[index].unit_price) + 
      return ((parseFloat(this.orders[index].unit_price) + parseFloat(this.orders[index].commission))* parseFloat(this.orders[index].quantity)).toFixed(2)
    }
    else{
      return ((parseFloat(this.orders[index].unit_price) + parseFloat(localStorage.getItem('commission')))* parseFloat(this.orders[index].quantity)).toFixed(2)
    }
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
  set_invoice(event:any){
    let file = event.target.files[0];
    this.file_name=file.name
    this.invoice.append('image', file, file.name);
  }
  uploadInvoice() {
    this.spinner.show();

    // upload the picture immidiately
    this.orderService.upload_invoice(this.order_id, this.invoice).subscribe(
      (success: any) => {
        this.spinner.hide();
        swal("Success","Payment record has been uploaded for order #"+this.order_id,"success").then(()=>{
          this.router.navigate(['/profile'],{queryParams:{activeItem:'3'}})
        });
        // this.openSnackBar('Profile Picture Updated!', 'OK');
        // this.profile_pic = config.img_base_url + success.data.profile_pic;
        // this.authService.uImg.next(this.profile_pic);
        // localStorage.setItem('uimg', this.profile_pic);
      },
      (error) => console.error(error)
    );
  }
  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }
}
