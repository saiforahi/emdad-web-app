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
    this.challan.append('image', file, file.name);
  }

  upload_challan(){
    this.spinner.show()
    this.challan.append('image', this.proofDoc);
    this.orderService.upload_delivery_challan(this.challan).subscribe(
      (success) => {console.log(success.data);this.spinner.hide();swal('Uploaded','Note Uploaded!','success')}
    )
  }

  change_status(value,prod_id){
    this.orderService.update_tracking_status({
      order: this.details.order.id,
      "order_confirmed_by":1
    }).subscribe(
      (success)=>{

      }
    )
    if(value=="1"){
      document.getElementById(prod_id+'card').style.display='none'
    }
    else if(value == "2"){
      document.getElementById(prod_id+'card').style.display='block'
    }
    else{
      document.getElementById(prod_id+'card').style.display='none'
    }
  }
}
