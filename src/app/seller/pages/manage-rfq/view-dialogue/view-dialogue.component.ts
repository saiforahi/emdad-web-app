import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { QuotationService } from '../../../../shared/services/quotation.service';
@Component({
  selector: 'app-view-dialogue',
  templateUrl: './view-dialogue.component.html',
  styleUrls: ['./view-dialogue.component.css']
})
export class ViewDialogueComponent implements OnInit {
  btnShow: boolean = true;
  isShown: boolean = false;
  error: any;
  msg;
  prodRfqForm: FormGroup;
  quoteFormShow: boolean = false;
  prodQuantity: AbstractControl;
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
  isEnabled:boolean = true;
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
    //Getting data for a individual rfq request
    this.quoteDetails.get_quotation_details(this.rfqId).subscribe(
      item => {
        this.rfqDetailAll = item.data;
        console.log("Product details:", this.rfqDetailAll);
      }
    )
    // form for making a quotation seller side
    this.prodRfqForm = this.fb.group({
      prodQuantity: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      unitPrice: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      totalPrice: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      attachments: [''],
      attachment1:[''],
      attachment2:['']
    });
    //initializing form fields
    this.prodQuantity = this.prodRfqForm.controls['prodQuantity'];
    this.unitPrice = this.prodRfqForm.controls['unitPrice'];
    this.totalPrice = this.prodRfqForm.controls['totalPrice'];
    this.attachments = this.prodRfqForm.controls['attachments'];
  }
  //form submit
  onSubmit(value) {
    this.prodRfqFormData.append("prodQuantity", value.prodQuantity);
    this.prodRfqFormData.append("unitPrice", value.unitPrice);
    this.prodRfqFormData.append("totalPrice", value.totalPrice);
  }
  //file upload
  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
    if(this.selectedImage.length == 1){
      this.attachment1=this.selectedImage[0];
      this.attachment2=null;
    }
    else if(this.selectedImage.length == 2){
      this.attachment1 = this.selectedImage[0];
      console.log(this.attachment1);
      this.attachment2 = this.selectedImage[1];
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

