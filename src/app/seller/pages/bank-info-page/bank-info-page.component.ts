import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BankInfoService } from 'src/app/shared/services/bank-info.service';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-bank-info-page',
  templateUrl: './bank-info-page.component.html',
  styleUrls: ['./bank-info-page.component.css'],
})
export class BankInfoPageComponent implements OnInit {
  error: any;
  msg;
  group: string;
  bankInfoForm: FormGroup;
  bankAcNumber: AbstractControl;
  attachments: AbstractControl;
  bankName: AbstractControl;
  swiftCode: AbstractControl;
  accountName: AbstractControl;
  bankAddress: AbstractControl;
  countryList: any;
  cityList: any;
  passMatched: boolean;
  showPassState: boolean;
  confShowPassState: boolean;
  selectedFile: any = [];
  existingFile: any = [];
  bank_letter:any;
  isShown:boolean = true;
  isInfo:boolean=false;
  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService,
    private subscription: SubscriptionService,
    private bankInfo: BankInfoService
  ) {
    this.populateFormData();
    
    this.authService.s_uId.subscribe((s_uid) => {
      console.log(s_uid);
      if (s_uid != null) {
        this.authService.sellerIsApproved(s_uid).subscribe((item: any) => {
          console.log(item);
          // Approved User, User Not Approve
          this.subscription.isSubscribed().subscribe((item2: any) => {
            console.log(item2);
            // User Not Subscribe, Subscribe User
            if (
              item.message != 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              this.router.navigate(['/dashboard/welcome']);
            } else if (
              item.message == 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              swal(
                'Access Denied!',
                'you are not subscribed to any plan! Please subscribe.',
                'error'
              );
              this.router.navigate(['/dashboard/subscription-plan']);
            }
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.bankInfoForm = this.fb.group({
      bankAcNumber: ['', [Validators.required]],
      attachments: [''],
      bankName: ['', [Validators.required]],
      swiftCode: [''],
      accountName: ['', [Validators.required]],
      bankAddress: ['', [Validators.required]],
    });
    this.bankAcNumber = this.bankInfoForm.controls['bankAcNumber'];
    this.attachments = this.bankInfoForm.controls['attachments'];
    this.bankName = this.bankInfoForm.controls['bankName'];
    this.swiftCode = this.bankInfoForm.controls['swiftCode'];
    this.accountName = this.bankInfoForm.controls['accountName'];
    this.bankAddress = this.bankInfoForm.controls['bankAddress'];
    this.bank_letter=this.bankInfoForm.controls['attachments'];
  }

  populateFormData() {
    this.bankInfo
      .getBankInfo(localStorage.getItem('s_uid'))
      .subscribe((item: any) => {
        console.log(item.data[0]);
        var data = item.data[0];
        this.bankInfoForm.setValue({
          bankAcNumber: data.account_number,
          bankName: data.bank_name,
          swiftCode: data.swift_code,
          accountName: data.account_name,
          bankAddress: data.bank_address,
          attachments: '',
        });
        if(data.account_letter!=null){
          this.existingFile[0] = { name: data.account_letter.split('/')[5] };
          this.isShown=false;
          this.isInfo=true;
        }
        
        //this.selectedFile.push(data.account_letter.split('/')[5])
      });
  }

  onSubmit(value:any) {
    // console.log(value);
    this.spinner.show();
    //console.log(this.selectedFile[0], this.selectedFile[0].name);
    var bankInfoFormData = new FormData();
    bankInfoFormData.append('seller', localStorage.getItem('s_uid'));
    bankInfoFormData.append('account_number', value.bankAcNumber);
    bankInfoFormData.append('bank_name', value.bankName);
    bankInfoFormData.append('swift_code', value.swiftCode);
    bankInfoFormData.append('bank_address', value.bankAddress);
    bankInfoFormData.append('account_name', value.accountName);
    bankInfoFormData.append('cart_currency', 'SR');
    if(this.selectedFile.length>0){
      bankInfoFormData.append('account_letter', this.selectedFile[0]);
    }
    // bankInfoFormData.forEach(data=>{
    //   console.log(data)
    // })
    this.bankInfo
      .addBankInfo(bankInfoFormData, localStorage.getItem('s_uid'))
      .subscribe(
        (success) => {
          console.log(success);
          this.spinner.hide();
          this.selectedFile = [];
          this.populateFormData();
          swal('Succeed', 'Bank Information updated!', 'success');
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          swal('Failed!', this.error, 'error');
        }
      );
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedFile.push(event.target.files[0]);
    if(this.selectedFile.length == 1){
this.isShown=false;
this.isInfo=true;
    }
    console.log(this.selectedFile[0]);
  }

  removeFile(id:any) {
    this.selectedFile.splice(id, 1);
    if(this.selectedFile.length == 0 ){
      this.isShown = true;
      
    }
  }

  deleteFile(id:any) {
    this.spinner.show();
    this.bankInfo
      .fileDelete(localStorage.getItem('s_uid'))
      .subscribe((item) => {
        console.log(item);
        this.spinner.hide();
        this.existingFile = [];
        if(this.existingFile.length == 0){
          this.isShown = true;
          
        }
        swal('Succeed', 'File deleted successfully', 'success');
      });
  }
}
