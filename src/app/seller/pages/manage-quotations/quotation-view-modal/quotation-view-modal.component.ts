import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { config } from 'src/config';
import {QuotationService} from '../../../../shared/services/quotation.service'
import swal from 'sweetalert'
import {NgxSpinnerService} from 'ngx-spinner'
@Component({
  selector: 'app-quotation-view-modal',
  templateUrl: './quotation-view-modal.component.html',
  styleUrls: ['./quotation-view-modal.component.css'],
})
export class QuotationViewModalComponent implements OnInit {
  /* selectedImage:Array<any>; */
  quoteData:FormGroup;
  selectedImage:any=[];
  quoteFormData=new FormData();
  details:any;
  quantity:AbstractControl;
  unit_price:AbstractControl;
  total_price:AbstractControl;
  attachments: AbstractControl;
  img_base_url=config.img_base_url
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private spinner:NgxSpinnerService, private quoteService:QuotationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log('data',this.data)
    this.quoteService.get_seller_quotation_details(this.data.quotation.id).subscribe(
      (success)=>{
        this.details=success.data
        console.log('quotation details',this.details)
      }
    )
    this.quoteData = this.fb.group({
      quantity: ['', [Validators.required]],
      unit_price: ['', [Validators.required]],
      total_price: ['', [Validators.required]],
      attachments: [''],
      status: 3,

      quotation: this.fb.array([
        this.fb.group({
          message: '',
          user: localStorage.getItem('s_uid'),
          // quantity: '',
          // unit_price: '',
          // total_price: ''
        }),
      ]),

    });
    // this.quoteData = new FormGroup({
    //   quantity: new FormControl("angular@gmail.com"),
    //   unitPrice: new FormControl("abcd1234")
    // });
  }

  removeFile(i:number){
    this.selectedImage.splice(i,1)
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }

  formatDate(date:string){
    if(date!=null){
      return new Date(date).toDateString()
    }
    return '-'
  }

  formatTime(date:string){
    if(date!=null){
      return new Date(date).toLocaleTimeString()
    }
    return '-'
  }

  onClickSubmit(data:any){
    this.spinner.show()
    console.log('form data',data)
    this.quoteService.updateQuotationSeller(this.details.id,{
      quotation:[{
        message:"",
        user:localStorage.getItem('s_uid')
      }],
      quantity:data.quantity,
      unit_price:data.unit_price,
      total_price:data.total_price
    }).subscribe(
      (success)=>{
        this.details.quotation.push({
          message:"",
          message_date:new Date(),
          quantity:data.quantity,
          unit_price:data.unit_price,
          total_price:data.total_price
        })
        this.quoteData.reset()
        this.spinner.hide()
        swal('Updated','Quotation updated successfully','success')
      },
      (error)=>{
        this.spinner.hide()
        swal('Failed',error.error.message,'error')
      }
    )
  }
  
}
