import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {QuotationService} from '../../../shared/services/quotation.service'
import swal from 'sweetalert';
@Component({
  selector: 'app-buyer-quotation-view',
  templateUrl: './buyer-quotation-view.component.html',
  styleUrls: ['./buyer-quotation-view.component.css']
})
export class BuyerQuotationViewComponent implements OnInit {
  quotation: any;
  quoteData: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: { quoteDetails: any }, private quotationService: QuotationService) { 
    this.quotation = data.quoteDetails;
    console.log('quotation detail from modal',data.quoteDetails);
  }

  ngOnInit(): void {

  }
download(){

}
getImageName(){

}

confirm_quotation(){
  let formData=new FormData()
  formData.append('status','3')
  this.quotationService.updateQuotation(this.data.quoteDetails.id, formData).subscribe(
    (success)=>{

    }
  )
}
}
