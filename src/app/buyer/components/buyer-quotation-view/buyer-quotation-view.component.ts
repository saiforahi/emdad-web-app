import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {QuotationService} from '../../../shared/services/quotation.service'
import swal from 'sweetalert';
import * as fileSaver from 'file-saver';
import { FileService } from '../../../shared/services/file.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { config } from 'src/config';
import { Cart } from 'src/app/shared/models/Cart.model';
import { GetProductService } from 'src/app/shared/services/get-product.service';
import { Router } from '@angular/router';
import { VatService } from 'src/app/shared/services/vat.service';
@Component({
  selector: 'app-buyer-quotation-view',
  templateUrl: './buyer-quotation-view.component.html',
  styleUrls: ['./buyer-quotation-view.component.css']
})
export class BuyerQuotationViewComponent implements OnInit {
  quotation: any;
  quoteData: FormGroup
  base_url:string=config.base_url
  quote:any
  comments:string="";
  param_array:any;
  product:any;
  vatPercentage:any;
  constructor(private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: { quoteDetails: any },private dialogRef: MatDialogRef<any>,private vat:VatService,private productService: GetProductService ,private quotationService: QuotationService, private spinner: NgxSpinnerService, private router: Router) { 
  }

  ngOnInit(): void {
    this.vat.getVat().subscribe((item) => {
      this.vatPercentage = parseFloat(item.data[0].percentage);
      this.update_data()
    });
  }

  update_data(){
    this.productService.productDetails(this.data.quoteDetails.product).subscribe(
      (success)=>{
        console.log('product',success.data[0])
        this.product=success.data[0]
      }
    )
    this.quotationService.get_quotation_details(this.data.quoteDetails.id).subscribe(
      (success)=>{
        this.quotation=success.data
        this.quote=success.data.quotation[success.data.quotation.length-1]
      }
    )
  }
  download(file_url:string){
    this.fileService.downloadFile(file_url).subscribe((response) => {
      // console.log(response);
      let blob: any = new Blob([response], {
        type: 'text/plain;charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob,this.param_array[this.param_array.length - 1]);
    }),
      (error) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
  
  getImageName(image_url: string){
    this.param_array = image_url.split('/');
    return this.param_array[this.param_array.length - 1];
  }
  deny_quotation(){
    this.spinner.show()
    this.quotationService.updateQuotationStatus(this.data.quoteDetails.id, {
      status:4
    }).subscribe(
      (success1)=>{
        this.quotationService.updateRfq(this.data.quoteDetails.rfq[0].id,{status:0,comments: this.comments}).subscribe(
          (success2)=>{
            this.spinner.hide()
            console.log(success1)
            console.log(success2)
            swal('Denied!','Quotation Denied','success')
          },
          (error)=>{
            this.spinner.hide()
          }
        )
      },
      (error)=>{
        this.spinner.hide()
      }
    )
  }
  confirm_quotation(){
    this.spinner.show()
    this.quotationService.updateRfq(this.data.quoteDetails.rfq[0].id,{status:1,comments:"completed"}).subscribe(
      (success)=>{
        this.quotationService.updateQuotationStatus(this.data.quoteDetails.id, {
          status:3
        }).subscribe(
          (success)=>{
            this.spinner.hide()
            console.log(success)
            
            swal('Accepted!','Quotation Accepted','success').then(()=>{
              this.update_data()
              this.check_out()
            })
          },
          (error)=>{
            this.spinner.hide()
          }
        )
      },
      (error)=>{}
    )
  }

  close_quotation(){
    this.spinner.show()
    this.quotationService.updateQuotationStatus(this.data.quoteDetails.id, {
      status:4
    }).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
        //swal('Accepted!','Quotation Accepted','success')
      },
      (error)=>{
        this.spinner.hide()
      }
    )
  }
  check_out(){
    // let cart:Cart=new Cart()
    localStorage.removeItem('cart')
    swal({
      title: "Do you want to buy this product now?",
      text: "Once you proceed to check out this quotation will be closed",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Confirm",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Cancel",
          value: true,
          visible: true,
          className: "swal-button--danger-copy",
          closeModal: true
        }
      },
      dangerMode: false,
    })
    .then((willDelete) => {
      if (!willDelete) {
        this.spinner.show()
        console.log('checking out...')
        let orders_details=[]
          let commission:number=this.get_commission_amount()
          // if(Number(this.product.commission)>0){
          //   commission= parseFloat(this.product.unit_price) * (parseFloat(this.product.commission)/100)
          // }
          // else{
          //   commission= parseFloat(this.product.unit_price) * (parseFloat(localStorage.getItem('commission'))/100)
          // }
          if(this.product.delivery_method == 1){
            orders_details.push({
              quantity:this.quotation.quotation[this.quotation.quotation.length-1].quantity,
              unit_price:this.quotation.quotation[this.quotation.quotation.length-1].unit_price,
              seller:this.quotation.seller.id,
              pickup_address:this.product.pickup_address[0]?.id,
              shipping_address:'',
              //pickup_address:product.delivery_method ===1?'':product.pickup_address[0]?.id,
              vat_amount:(this.quotation.quotation[this.quotation.quotation.length-1].total_price * (this.vatPercentage / 100)).toFixed(2),
              commission:commission.toFixed(2),
              product:this.product.id
            })
          }
          else{
            orders_details.push({
              quantity:this.quotation.quotation[this.quotation.quotation.length-1].quantity,
              unit_price:this.quotation.quotation[this.quotation.quotation.length-1].unit_price,
              seller:this.product.seller.id,
              pickup_address:this.product.pickup_address[0]?.id,
              shipping_address:'',
              //shipping_address:'',
              //pickup_address:product.delivery_method ===1?'':product.pickup_address[0]?.id,
              vat_amount:(this.quotation.quotation[this.quotation.quotation.length-1].total_price * (this.vatPercentage / 100)).toFixed(2),
              commission:commission.toFixed(2),
              product:this.product.id
            })
          }
          var cart_cash = {
            subtotal: 1,
            discount: 0,
            discount_type: '',
            vat: this.get_vat_amount(),
            total: Number(this.quotation.quotation[this.quotation.quotation.length-1].total_price),
          };

          let cart_items = {
            total_amount: Number(this.quotation.quotation[this.quotation.quotation.length-1].total_price),
            buyer: localStorage.getItem('uid'),
            payment_type: '',
            discount_coupon_amount: 0,
            discount_coupon: '',
            orders_details: orders_details,
            tracking_order: [{
              seller: this.product.seller.id,
              product: this.quotation.product.id,
              status: 1,
              order_created_by: localStorage.getItem('uid'),
              order_creation_date: new Date().toLocaleDateString(),
            }],
            total_items: 1
          };
          this.close_quotation()
          localStorage.setItem('cart_items', JSON.stringify(cart_items));
          localStorage.setItem('cart_cash', JSON.stringify(cart_cash));
          console.log('cart cash',localStorage.getItem('cart_cash'));
          console.log('cart items',localStorage.getItem('cart_items'));
          this.spinner.hide()
          this.dialogRef.close()
          this.router.navigate(['/checkout'])
      } 
    });
  }

  get_commission_amount():number{
    return (100 * ((parseFloat(this.quotation.quotation[this.quotation.quotation.length-1].unit_price)-parseFloat(this.product.unit_price)))/parseFloat(this.product.unit_price))
  }

  get_vat_amount(){
    return (parseFloat(this.quotation.quotation[this.quotation.quotation.length-1].total_price) * (this.vatPercentage/100)).toFixed(2)
  }
}
