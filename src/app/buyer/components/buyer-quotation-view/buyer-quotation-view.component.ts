import { Component, OnInit,Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {QuotationService} from '../../../shared/services/quotation.service'
import swal from 'sweetalert';
import * as fileSaver from 'file-saver';
import { FileService } from '../../../shared/services/file.service';
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
  comments:string="";
  param_array:any;
  constructor(private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: { quoteDetails: any }, private quotationService: QuotationService, private spinner: NgxSpinnerService) { 
    this.quotation = data.quoteDetails;
    this.quote=data.quoteDetails.quotation[data.quoteDetails.quotation.length-1]
    console.log('quotation detail from modal',this.quotation);
  }

  ngOnInit(): void {

  }
  download(file_url:string){
    this.fileService.downloadFile(file_url).subscribe((response) => {
      // console.log(response);
      let blob: any = new Blob([response], {
        type: 'text/plain;charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob,this.param_array[this.param_array.length - 1]);
    }),
      (error) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
  
  getImageName(image_url: string){
    this.param_array = image_url.split('/');
    return this.param_array[this.param_array.length - 1];
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

  check_out(){
    this.spinner.show()
  }
}
