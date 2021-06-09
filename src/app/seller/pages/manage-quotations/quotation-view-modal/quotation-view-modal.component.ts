import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { config } from 'src/config';
import {QuotationService} from '../../../../shared/services/quotation.service'
import swal from 'sweetalert'
import {NgxSpinnerService} from 'ngx-spinner'
import { CommissionService } from 'src/app/shared/services/commission.services';
import { FileService } from 'src/app/shared/services/file.service';
@Component({
  selector: 'app-quotation-view-modal',
  templateUrl: './quotation-view-modal.component.html',
  styleUrls: ['./quotation-view-modal.component.css'],
})
export class QuotationViewModalComponent implements OnInit {
  /* selectedImage:Array<any>; */
  quoteData:FormGroup;
  selectedImage:any=[];
  quoteFormData:FormData=new FormData();
  details:any;
  quantity:AbstractControl;
  unit_price:AbstractControl;
  total_price:AbstractControl;
  attachments: AbstractControl;
  attachment1: AbstractControl;
  attachment2: AbstractControl;
  attachment_list:Array<any>=[]
  message: AbstractControl;
  img_base_url=config.img_base_url
  commission:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fileService:FileService,private spinner:NgxSpinnerService, private quoteService:QuotationService, private fb: FormBuilder, private commissionService:CommissionService) {}

  ngOnInit(): void {
 
    window.scrollTo(0, 0);
    console.log('data',this.data)
    this.quoteService.get_seller_quotation_details(this.data.quotation.id).subscribe(
      (success)=>{
        this.details=success.data
        this.attachment_list.push(this.details.attachment1)
        this.attachment_list.push(this.details.attachment2)
        console.log('quotation details',this.details)
        if(parseFloat(this.details.product.commission)<=0){
          this.commissionService.getCommission().subscribe(
            (item) => {
              localStorage.setItem('commission',item.data[0].percentage.toString())
              this.commission=item.data[0].percentage.toString()
              console.log('prod commission',this.commission)
            },
            (err) => {
              console.log(err);
            }
          );
        }
        else{
          this.commission=this.details.product.commission
        }
      }
    )
    this.quoteData = this.fb.group({
      quantity: ['', [Validators.required]],
      unit_price: ['', [Validators.required]],
      total_price: ['', [Validators.required]],
      attachments: [''],
      attachment1:'',
      attachment2:'',
      status: 2,
      message: '',
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
    this.quantity = this.quoteData.controls['quantity'];
    this.unit_price = this.quoteData.controls['unit_price'];
    this.total_price = this.quoteData.controls['total_price'];
    this.attachments = this.quoteData.controls['attachments'];
    this.message = this.quoteData.controls['message'];
  }

  removeFile(i:number){
    this.selectedImage.splice(i,1)
    this.attachment_list.splice(i,1)
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    this.attachment_list.push(event.target.files[0].name)
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
    let quoteFormData=new FormData()
    this.spinner.show()
    data.quotation[0].message=data.message
    console.log('before setting form group',data.quotation)
    quoteFormData.append('quantity', data.quantity);
    quoteFormData.append('unit_price', data.unit_price);
    quoteFormData.append('total_price', data.total_price);
    quoteFormData.append('status', data.status);
    quoteFormData.append('quotation[0]message', data.message)
    quoteFormData.append('quotation[0]user', localStorage.getItem('s_uid'))
    quoteFormData.append('message',data.message)
    //image attachment issues
    
    if (this.selectedImage.length == 2) {
      // if two files to upload
      console.log("condition one")
      quoteFormData.append('attachment1',this.selectedImage[0]);
      quoteFormData.append('attachment2',this.selectedImage[1]);
    } 
    else if (this.details.attachment1 == null && this.selectedImage.length == 1) {
      // if only one file to upload in attachment1 
      console.log("condition two")
      quoteFormData.append('attachment1',this.selectedImage[0]);
    } else if ( this.details.attachment2 == null && this.selectedImage.length == 1) {
      console.log("condition three")
      quoteFormData.append('attachment2',this.selectedImage[0]);
    }
    else if (this.details.attachment1 == null && this.details.attachment2 == null && this.selectedImage.length == 0) {
      if(this.details.attachment1!=null){
        quoteFormData.append("attachment1", this.details.attachment1)
      }
      else{
        quoteFormData.append("attachment1", '')
      }
      if(this.details.attachment2!=null){
        quoteFormData.append("attachment2", this.details.attachment2)
      }
      else{
        quoteFormData.append("attachment2", '')
      }
    }
    for (var pair of Object.entries(quoteFormData)) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    quoteFormData.forEach(data=>{
      if(typeof(data) == 'object'){
        
      }
      else{
        console.log(data)
      }
    })
    this.quoteService.updateQuotationSeller(this.details.id,quoteFormData).subscribe(
      ()=>{
        this.details.quotation.push({
          message:data.message,
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
        console.log(error)
        this.spinner.hide()
        swal('Failed',"error",'error')
      }
    )
  }

  calc_unit_price(price:string){
    // let new_price= parseFloat(price) + (parseFloat(price) * (parseFloat(this.commission)/100))
    let new_price= parseFloat(price)
    this.quoteData.controls['unit_price'].setValue(new_price.toFixed(2))
    this.quoteData.controls['total_price'].setValue((new_price * parseFloat(this.quoteData.get('quantity').value)).toFixed(2)) 
  }

  calc_total_price(){
    let total=parseFloat(this.quoteData.controls['quantity'].value) * parseFloat(this.quoteData.controls['unit_price'].value)
    this.quoteData.controls['total_price'].setValue(total.toFixed(2))
  }
  get_file_name(path:string){
    let arr:Array<string>=path.split('/')
    return arr[arr.length-1]
  }
  // download_attachment(index:any) {
  //   this.fileService.downloadFile().subscribe((response) => {
  //     // console.log(response);
  //     let blob: any = new Blob([response], {
  //       type: 'text/plain;charset=utf-8',
  //     });
  //     const url = window.URL.createObjectURL(blob);
  //     //window.open(url);
  //     //window.location.href = response.url;
  //     fileSaver.saveAs(blob, 'ticket.jpg');
  //   }),
  //     (error) => console.log('Error downloading the file'),
  //     () => console.info('File downloaded successfully');
  // }
}
