import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuotationService } from '../../../../shared/services/quotation.service';
import swal from 'sweetalert';
import { CommissionService } from 'src/app/shared/services/commission.services';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-view-dialogue',
  templateUrl: './view-dialogue.component.html',
  styleUrls: ['./view-dialogue.component.css']
})
export class ViewDialogueComponent implements OnInit {
  //initialization
  btnShow: boolean = true;
  isShown: boolean = false;
  error: any;
  msg: any;
  prodRfqForm: FormGroup;
  quoteFormShow: boolean = false;
  quantity: AbstractControl;
  unit_price: AbstractControl;
  total_price: AbstractControl;
  attachments: AbstractControl;
  numberPattern = '^[0-9]$';
  selectedImage: any = [];
  quotation: AbstractControl;
  prodRfqFormData = new FormData();
  rfqDetailsData: any;
  rfqDetailAll: any;
  rfqId: any;
  attachment1: AbstractControl;
  attachment2: AbstractControl;
  rfq: AbstractControl;
  isEnabled: boolean = true;
  uid: string;
  submitted = false;
  commission:any
  existingFiles: number;
  constructor(
    private fb: FormBuilder,
    private quoteDetails: QuotationService,
    private commissionService:CommissionService,
    private spinner:NgxSpinnerService,

    @Inject(MAT_DIALOG_DATA) public data: { rfqDetails: any }) {
    this.rfqDetailsData = data.rfqDetails;
    this.rfqId = this.rfqDetailsData.id;
    console.log("id", this.rfqId);
    console.log('modal data', data.rfqDetails);
  }

  ngOnInit(): void {
    //get user id and rfq detail and pass it to rfq child component

    this.uid = localStorage.getItem('s_uid');
    console.log('uid', this.uid);
    // form for making a quotation seller side
    this.prodRfqForm = this.fb.group({
      quantity: ['', [Validators.required]],
      unit_price: ['', [Validators.required]],
      total_price: ['', [Validators.required]],
      attachments: [''],
      status: 2,
      message:"",
      quotation: this.fb.array([
        this.fb.group({
          message: '',
          user: this.uid,
          quantity: this.quantity,
          unit_price: this.unit_price,
          total_price: this.total_price
        }),
      ]),

    });
    //initializing form fields

    this.quantity = this.prodRfqForm.controls['quantity'];
    this.unit_price = this.prodRfqForm.controls['unit_price'];
    this.total_price = this.prodRfqForm.controls['total_price'];
    this.attachments = this.prodRfqForm.controls['attachment'];
    this.quotation = this.prodRfqForm.controls['quotation'];

    //Getting data for a individual rfq request
    this.quoteDetails.get_seller_quotation_details(this.rfqId).subscribe(
      item => {
        this.rfqDetailAll = item.data;
        console.log("Product details:", this.rfqDetailAll);
        this.commissionService.getCommission().subscribe(
          (item) => {
            localStorage.setItem('commission',item.data[0].percentage.toString())
            this.commission=item.data[0].percentage.toString()
          },
          (err) => {
            console.log(err);
          }
        );
      }
    )

  }
  //form submit
  onSubmit(value: { quantity: string | Blob; unit_price: string | Blob; total_price: string | Blob; status: string | Blob; message: string | Blob; }) {
    this.spinner.show()

    this.prodRfqFormData.append('quantity', value.quantity);
    this.prodRfqFormData.append('unit_price', value.unit_price);
    this.prodRfqFormData.append('total_price', value.total_price);
    this.prodRfqFormData.append('status', value.status);
    this.prodRfqFormData.append('quotation[0]user', localStorage.getItem('s_uid'))
    this.prodRfqFormData.append('quotation[0]message',value.message)
    this.prodRfqFormData.append('message',value.message)

    //image attachment issues

    if (this.selectedImage.length == 2) {
      // if two files to upload
      console.log("condition one")
      this.prodRfqFormData.append(
        'attachment1',
        this.selectedImage[0]
      );
      this.prodRfqFormData.append(
        'attachment2',
        this.selectedImage[1]
      );
    } else if (
      this.rfqDetailsData.attachment1 == null &&
      this.selectedImage.length == 1
    ) {
      // if only one file to upload in attachment1 
      console.log("condition two")
      this.prodRfqFormData.append(
        'attachment1',
        this.selectedImage[0]
      );
    } else if (
      this.rfqDetailsData.attachment2 == null &&
      this.selectedImage.length == 1
    ) {
      // if only one file to upload in attachment2
      console.log("condition three")
      // this.prodRfqFormData.append(
      //   'attachment1',
      //   null
      // );
      this.prodRfqFormData.append(
        'attachment2',
        this.selectedImage[0]
      );
    }
    else if (this.rfqDetailsData.attachment1 == null && this.rfqDetailsData.attachment2 == null && this.selectedImage.length == 0) {
      if(this.rfqDetailsData.attachment1!=null){
        this.prodRfqFormData.append("attachment1", this.rfqDetailsData.attachment1);
      }
      else{
        this.prodRfqFormData.append("attachment1",'');
      }
      if(this.rfqDetailsData.attachment2!=null){
        this.prodRfqFormData.append("attachment2", this.rfqDetailsData.attachment2);
      }
      else{
        this.prodRfqFormData.append("attachment2",'');
      }
    }
    this.quoteDetails.updateQuotationSeller(this.rfqId, this.prodRfqFormData).subscribe(
      (res) => {
        console.log(res);
        this.quoteDetails.updateRfqSeller(this.data.rfqDetails.rfq[0].id,{comments:"replied",status:1}).subscribe(
          ()=>{
            this.spinner.hide()
            swal('Succeed', "Submitted Quotation Successfully", 'success');
          },
          ()=>{}
        )
      },
      (err) => {
        console.error(err);
        this.spinner.hide()
        swal('Failed!', "Something went wrong", 'error');
      }
    );

  }
  //file upload
  handleFileSelect(event: { target: { files: any[]; }; }) {
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
    /*    if(this.selectedImage.length == 1){
         this.attachment1=this.selectedImage[0].name;
         console.log("this",this.attachment1);
         this.attachment2 = null;
       } */
    if (this.selectedImage.length == 2) {
      /*    this.attachment1 = this.selectedImage[0].name;
         console.log(this.attachment1);
         this.attachment2 = this.selectedImage[1].name;
         console.log(this.attachment2); */
      this.isEnabled = false;

    }

  }
  //file remove
  removeFile(id: any) {
    this.selectedImage.splice(id, 1);
    if (this.selectedImage.length < 2) {
      this.isEnabled = true;
    }
  }
  //whether the quotation field will be visible or not
  showQuote() {
    this.btnShow = false;
    this.isShown = true;
  }

  calc_unit_price(price:string){
    let new_price= parseFloat(price)
    this.prodRfqForm.controls['unit_price'].setValue(new_price.toFixed(2))
    this.prodRfqForm.controls['total_price'].setValue((new_price * parseFloat(this.prodRfqForm.get('quantity').value)).toFixed(2)) 
  }

  calc_total_price(){
    let total=parseFloat(this.prodRfqForm.controls['quantity'].value) * parseFloat(this.prodRfqForm.controls['unit_price'].value)
    this.prodRfqForm.controls['total_price'].setValue(total.toFixed(2))
  }
  
  calc_quotation_unit_price(price: string){
    return parseFloat(price).toFixed(2)
  }
}

