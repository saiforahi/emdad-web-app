import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {OrderService} from '../../../../shared/services/order.service'
import {config} from '../../../../../config';
import * as fileSaver from 'file-saver';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert';
import { FileService } from 'src/app/shared/services/file.service';
import { AddressService } from 'src/app/shared/services/address.service';
@Component({
  selector: 'app-order-view-modal',
  templateUrl: './order-view-modal.component.html',
  styleUrls: ['./order-view-modal.component.css']
})
export class OrderViewModalComponent implements OnInit {
  details:any
  img_base_url=config.img_base_url;
  proofDoc:any;
  show:boolean=false;
  attachForm:FormGroup;
  challan: FormData;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private orderService:OrderService, private spinner:NgxSpinnerService, private fileService:FileService,
    private fb: FormBuilder,private addressService:AddressService) { }

  ngOnInit(): void {
    console.log('dialog data',this.data)
    this.challan=new FormData()
    this.initialize()
  }
  initialize(): void {
    this.orderService.get_seller_order_details(this.data.order.order.id).subscribe(
      (success)=>{
        console.log('details',success)
        this.details=success.data
        this.details[0].order.tracking_order.forEach((element:any) => {
          if(Number(element.status)<3){
            //element.status="-1"
          }
        });
        // this.details.forEach((element:any) => {
        //   this.addressService.get_pickup_address_details(element.pickup_address).subscribe(
        //     (success)=>{
        //       console.log(success.data[0])
        //       if(success.data.length>0){
        //         element.pickup_address=success.data[0]
        //       } 
        //     }
        //   )
        // });
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  upload(event:any){
    var reader = new FileReader();
    this.proofDoc = event.target.files[0];

    reader.readAsDataURL(this.proofDoc);
  }
  removeFile(){
    this.proofDoc=""
    this.challan=new FormData()
  }
  //date format helper
  formatDate(date:string){
    if(date!=null){
      return new Date(date).toDateString()
    }
    return '-'
  }
  
  set_challan(event:any){
    let file = event.target.files[0];
    this.proofDoc = file;
    this.challan.append('image', file, file.name);
  }

  upload_challan(prod_id,index:number){ //challan uploading and updating status
    if(this.proofDoc!==null && this.proofDoc!==undefined){
      this.spinner.show()
      this.challan.append('delivery_challan', this.proofDoc);
      this.challan.append('status','4')
      console.log(this.challan.get('Delivery_challan'))
      this.orderService.upload_delivery_challan(this.details[0].order.tracking_order[index].id,this.challan).subscribe( //uploading challan
        (success1) => {       
          console.log('challan upload status',success1)                                             //if success then call update track status API
          if(success1.success==='True'){
            this.orderService.update_tracking_status({                      //passing data with http call
              "order": this.details[0].order.id,
              "product":prod_id,
              "order_confirmed_by":Number(localStorage.getItem('s_uid')),
              "order_confirmed_date":new Date().toISOString().slice(0, 10),
              "delivery_by_courier_name":"hasan",
              "delivery_date": new Date(),
              "status":"4"
            }).subscribe(
              (success)=>{
                this.spinner.hide();swal('Uploaded','Note Uploaded!','success');this.initialize(); 
              },
              (error)=>{
                this.spinner.hide()
              }
            )
          }
          else{
            this.spinner.hide()
            swal('Failed','Failed to upload delivery note','error')
          }
        }
      )
    }
  }

  cancel_upload(prod_id:any){
    document.getElementById(prod_id+'card').style.display='none'
    this.initialize()
  }
  change_status(value,prod_id){
    if(value=="3"){
      this.spinner.show()
      document.getElementById(prod_id+'card').style.display='none'
      this.orderService.update_tracking_status({
        "order": this.details[0].order.id,
        "product":prod_id,
        "order_confirmed_by":Number(localStorage.getItem('s_uid')),
        "order_confirmed_date":new Date().toISOString().slice(0, 10),
        "delivery_by_courier_name":"hasan",
        "delivery_date": new Date(),
        "status":"3"
      }).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          swal('Updated','Product Status updated','success')
          this.initialize()
        },
        (error)=>{
          this.spinner.hide()
          console.log(error)
        }
      )
    }
    else if(value == "4"){
      document.getElementById(prod_id+'card').style.display='block'
    }
    else if(value == "5"){
      this.spinner.show()
      this.orderService.update_tracking_status({
        "order": this.details[0].order.id,
        "product":prod_id,
        "order_confirmed_by":Number(localStorage.getItem('s_uid')),
        "order_confirmed_date":new Date().toISOString().slice(0, 10),
        "delivery_by_courier_name":"hasan",
        "delivery_date": new Date(),
        "status":"5"
      }).subscribe(
        (success)=>{
          console.log(success)
          this.spinner.hide()
          swal('Updated','Product Status updated','success')
          this.initialize()
        },
        (error)=>{
          this.spinner.hide()
          console.log(error)
        }
      )
    }
    else{
      document.getElementById(prod_id+'card').style.display='none'
    }
  }

  get_price(unit_price:string,quantity:string,commission:string,vat_amount:string){
    return (parseFloat(unit_price)*parseFloat(quantity)).toFixed(2)
  }

  
}
