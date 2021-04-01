import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {OrderService} from '../../../../shared/services/order.service'
import {config} from '../../../../../config';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import swal from 'sweetalert';
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
    private orderService:OrderService, private spinner:NgxSpinnerService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log('dialog data',this.data)
    this.challan=new FormData()
    this.orderService.get_seller_order_details(this.data.order.order.id).subscribe(
      (success)=>{
        console.log('details',success)
        this.details=success.data
      },
      (error)=>{}
    )
  }
upload(event){
  var reader = new FileReader();
  this.proofDoc = event.target.files[0];

  reader.readAsDataURL(this.proofDoc);
}
removeFile(){
  this.proofDoc=""
  this.challan=new FormData()
}
onSubmit(){
  
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

  upload_challan(){ //challan uploading and updating status
    if(this.proofDoc!==null && this.proofDoc!==undefined){
      this.spinner.show()
      this.challan.append('image', this.proofDoc);
      this.orderService.upload_delivery_challan(this.challan).subscribe( //uploading challan
        (success) => {                                                    //if success then call update track status API
          this.orderService.update_tracking_status({                      //passing data with http call
            order: this.details[0].order.id,
            "order_confirmed_by":localStorage.getItem("s_uid"),
            "order_confirmed_date":new Date(),
            "delivery_by_courier_name":"hasan",
            "delivery_date": new Date(),
            "status":"4"
          }).subscribe(
            (success)=>{
              console.log(success.data);this.spinner.hide();swal('Uploaded','Note Uploaded!','success')
            }
          )
        }
      )
    }
  }

  change_status(value,prod_id){
    if(value=="1"){
      console.log(localStorage.getItem('s_token'))
      console.log(JSON.stringify({
        order: this.details[0].order.id,
        "order_confirmed_by":localStorage.getItem("s_uid"),
        "order_confirmed_date":new Date().toLocaleDateString(),
        "delivery_by_courier_name":"hasan",
        "delivery_date": new Date(),
        "status":"3"
      }))
      document.getElementById(prod_id+'card').style.display='none'
      this.orderService.update_tracking_status({
        order: this.details[0].order.id,
        "order_confirmed_by":localStorage.getItem("s_uid"),
        "order_confirmed_date":new Date(),
        "delivery_by_courier_name":"hasan",
        "delivery_date": new Date(),
        "status":"3"
      }).subscribe(
        (success)=>{
          console.log(success)
          swal('Updated','Product Status updated','success')
        }
      )
    }
    else if(value == "2"){
      document.getElementById(prod_id+'card').style.display='block'
    }
    else{
      document.getElementById(prod_id+'card').style.display='none'
    }
  }
}
