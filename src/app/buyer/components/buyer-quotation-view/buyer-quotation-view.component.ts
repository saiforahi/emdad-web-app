import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert';
@Component({
  selector: 'app-buyer-quotation-view',
  templateUrl: './buyer-quotation-view.component.html',
  styleUrls: ['./buyer-quotation-view.component.css']
})
export class BuyerQuotationViewComponent implements OnInit {
  quotation: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: { quoteDetails: any }) { 
    this.quotation = data.quoteDetails;
    console.log('quotation detail from modal',this.quotation);
  }

  ngOnInit(): void {

  }
download(){

}
getImageName(){

}
}
