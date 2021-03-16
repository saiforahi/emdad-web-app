import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { QuotationService } from '../../../../shared/services/quotation.service';


import swal from 'sweetalert';
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
  msg;
  prodRfqForm: FormGroup;
  quoteFormShow: boolean = false;
  quantity: AbstractControl;
  unitPrice: AbstractControl;
  totalPrice: AbstractControl;
  attachments: AbstractControl;
  numberPattern = '^[0-9]$';
  selectedImage: any = [];
  quotation:AbstractControl;
  prodRfqFormData = new FormData();
  rfqDetailsData: any;
  rfqDetailAll: any;
  rfqId:any;
  attachment1:AbstractControl;
  attachment2:AbstractControl;
  rfq:AbstractControl;
  isEnabled:boolean = true;
 uid;
  submitted = false;
  existingFiles: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: UserAuthService,
    private quoteDetails: QuotationService,
    
    @Inject(MAT_DIALOG_DATA) data: { rfqDetails: any }) {
    this.rfqDetailsData = data.rfqDetails;
    this.rfqId=this.rfqDetailsData.id;
    console.log("id",this.rfqId);
    
  }

  ngOnInit(): void {
     //get user id and rfq detail and pass it to rfq child component
   
   this.uid = localStorage.getItem('s_uid');
   console.log('uid',this.uid);
         // form for making a quotation seller side
        this.prodRfqForm = this.fb.group({
          quantity: ['', [Validators.required]],
          unitPrice: ['', [Validators.required]],
          totalPrice: ['', [Validators.required]],
          attachments: [''],
          status:3,
       
       quotation: this.fb.array([
            this.fb.group({
              message: '',
              user: this.uid,
              quantity:this.quantity,
              unit_price:this.unitPrice,
              total_price:this.totalPrice
            }),
          ]), 
        
        });
          //initializing form fields

    this.quantity = this.prodRfqForm.controls['quantity'];
    this.unitPrice = this.prodRfqForm.controls['unitPrice'];
    this.totalPrice = this.prodRfqForm.controls['totalPrice'];
    this.attachments = this.prodRfqForm.controls['attachment'];
    this.quotation=this.prodRfqForm.controls['quotation'];
   
    //Getting data for a individual rfq request
    this.quoteDetails.get_quotation_details(this.rfqId).subscribe(
      item => {
        this.rfqDetailAll = item.data;
        console.log("Product details:", this.rfqDetailAll);
      }
    )

  }
  //form submit
  onSubmit(value){
    
 
  this.prodRfqFormData.append('quantity',value.quantity);
  this.prodRfqFormData.append('unit_price',value.unitPrice);
  this.prodRfqFormData.append('total_price',value.totalPrice);
  this.prodRfqFormData.append('status',value.status);
  this.prodRfqFormData.append('quotation',value.quotation)

 
//image attachment issues

if (
  (this.rfqDetailsData.attachment1 == null || this.rfqDetailsData.attachment1 != null) &&
  (this.rfqDetailsData.attachment2 == null && this.rfqDetailsData.attachment2 != null) &&
  this.selectedImage.length == 2
) {
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
  // this.prodRfqFormData.append(
  //   'attachment2',
  //   null
  // );
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
else if(this.rfqDetailsData.attachment1==null && this.rfqDetailsData.attachment2==null && this.selectedImage.length == 0){
this.prodRfqFormData.append("attachment1",this.rfqDetailsData.attachment1);
this.prodRfqFormData.append("attachment2",this.rfqDetailsData.attachment2)

}


    this.quoteDetails.updateQuotation(this.rfqId,this.prodRfqFormData).subscribe(
      (res) =>{
        console.log(res);
        swal('Succeed',"Submitted Quotation Successfully",'success');
        
      },
      (err) => {console.error(err);
      swal('Failed!', "Something went wrong", 'error');
      }
    );

  }
  //file upload
  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
 /*    if(this.selectedImage.length == 1){
      this.attachment1=this.selectedImage[0].name;
      console.log("this",this.attachment1);
      this.attachment2 = null;
    } */
    if(this.selectedImage.length == 2){
   /*    this.attachment1 = this.selectedImage[0].name;
      console.log(this.attachment1);
      this.attachment2 = this.selectedImage[1].name;
      console.log(this.attachment2); */
      this.isEnabled = false;
    
    }
  
  }
//file remove
  removeFile(id) {
    this.selectedImage.splice(id, 1);
    if(this.selectedImage.length<2){
      this.isEnabled = true;
    }
  }
  //whether the quotation field will be visible or not
  showQuote() {
    this.btnShow = false;
    this.isShown = true;
  }
}

