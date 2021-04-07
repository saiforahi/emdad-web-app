import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {QuotationService} from '../../../shared/services/quotation.service'
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';
import { config } from 'src/config';
@Component({
  selector: 'app-buyer-quotation-view',
  templateUrl: './buyer-quotation-view.component.html',
  styleUrls: ['./buyer-quotation-view.component.css']
})
export class BuyerQuotationViewComponent implements OnInit {
  quotation: any;
  quoteData: FormGroup
  base_url:string=config.base_url
  quote:any
  comments:string=""
  constructor(@Inject(MAT_DIALOG_DATA) public data: { quoteDetails: any }, private quotationService: QuotationService, private spinner: NgxSpinnerService) { 
    this.quotation = data.quoteDetails;
    this.quote=data.quoteDetails.quotation[data.quoteDetails.quotation.length-1]
    console.log('quotation detail from modal',this.quotation);
  }

  ngOnInit(): void {

  }
  download(){

  }
  getImageName(){

  }
  deny_quotation(){
    this.spinner.show()
    this.quotationService.updateQuotationStatus(this.data.quoteDetails.id, {
      status:4
    }).subscribe(
      (success1)=>{
        this.quotationService.updateRfq(this.data.quoteDetails.rfq[0].id,{status:0,comments: this.comments}).subscribe(
          (success2)=>{
            this.spinner.hide()
            console.log(success1)
            console.log(success2)
            swal('Denied!','Quotation Denied','success')
          },
          (error)=>{
            this.spinner.hide()
          }
        )
      },
      (error)=>{
        this.spinner.hide()
      }
    )
  }
  confirm_quotation(){
    this.spinner.show()
    this.quotationService.updateQuotationStatus(this.data.quoteDetails.id, {
      status:3
    }).subscribe(
      (success)=>{
        this.spinner.hide()
        console.log(success)
        swal('Accepted!','Quotation Accepted','success')
      },
      (error)=>{
        this.spinner.hide()
      }
    )
  }
}
