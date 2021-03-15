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
 /*  prodRfqForm: FormGroup; */
  quoteFormShow: boolean = false;
  quantity: AbstractControl;
  unitPrice: AbstractControl;
  totalPrice: AbstractControl;
  attachments: AbstractControl;
  numberPattern = '^[0-9]$';
  selectedImage: any = [];
  prodRfqFormData = new FormData();
  rfqDetailsData: any;
  rfqDetailAll: any;
  rfqId:any;
  attachment1:AbstractControl;
  attachment2:AbstractControl;
  rfq:AbstractControl;
  isEnabled:boolean = true;
   uid:any;
  submitted = false;
     // form for making a quotation seller side
     prodRfqForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      unitPrice: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      totalPrice: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      attachments: [''],
      attachment1:[''],
      attachment2:[''], 
   /*    quotation: this.fb.array([
        this.fb.group({
          message: '',
          user: '',
        }),
      ]), */
      rfq: { status: 1 },
    });
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: UserAuthService,
    private quoteDetails: QuotationService,
    @Inject(MAT_DIALOG_DATA) data: { rfqDetails: any }) {
    this.rfqDetailsData = data.rfqDetails;
    this.rfqId=this.rfqDetailsData.id;
    console.log("id",this.rfqId);
  }

  ngOnInit(): void {
    this.uid = localStorage.getItem('s_uid');
    console.log('uid',this.uid);
    //Getting data for a individual rfq request
    this.quoteDetails.get_quotation_details(this.rfqId).subscribe(
      item => {
        this.rfqDetailAll = item.data;
        console.log("Product details:", this.rfqDetailAll);
      }
    )
   

    //initializing form fields
    this.quantity = this.prodRfqForm.controls['quantity'];
    this.unitPrice = this.prodRfqForm.controls['unitPrice'];
    this.totalPrice = this.prodRfqForm.controls['totalPrice'];
    this.attachment1 = this.prodRfqForm.controls['attachment1'];
    this.attachment2 = this.prodRfqForm.controls['attachment2'];
    this.attachment2 = this.prodRfqForm.controls['attachments'];
    
    }
  //form submit
  onSubmit():void {
    
 /*  this.prodRfqFormData.append('attachment1',this.prodRfqForm.value.attachment1);
  this.prodRfqFormData.append('attachment2',this.prodRfqForm.value.attachment2); */
  this.prodRfqFormData.append('quantity',this.prodRfqForm.value.quantity);
  this.prodRfqFormData.append('unit_price',this.prodRfqForm.value.unitPrice);
  this.prodRfqFormData.append('total_price',this.prodRfqForm.value.totalPrice);
  this.prodRfqFormData.append('status',this.prodRfqForm.value.status);
  this.prodRfqForm.patchValue({ quotation: [{ message: '', user: this.uid }] });
    this.quoteDetails.updateQuotation(this.rfqId,this.prodRfqFormData).subscribe(
      (res) =>{
        console.log(res);
        swal("Submitted Quotation Successfully");
      },
      (err) => console.error(err)
    );

  }
  //file upload
  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
    if(this.selectedImage.length == 1){
      this.attachment1=this.selectedImage[0].name;
      console.log("this",this.attachment1);
      this.attachment2 = null;
    }
    else if(this.selectedImage.length == 2){
      this.attachment1 = this.selectedImage[0].name;
      console.log(this.attachment1);
      this.attachment2 = this.selectedImage[1].name;
      console.log(this.attachment2);
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

