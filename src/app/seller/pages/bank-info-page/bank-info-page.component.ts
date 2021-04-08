import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-bank-info-page',
  templateUrl: './bank-info-page.component.html',
  styleUrls: ['./bank-info-page.component.css']
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
  selectedImage: any=[];

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService,
    private subscription: SubscriptionService
  ) {
    this.authService.sellerIsApproved(localStorage.getItem("s_uid")).subscribe((item: any) => {
      console.log(item)
      // Approved User, User Not Approve
      this.subscription.isSubscribed().subscribe((item2: any) => {
        console.log(item2)
        // User Not Subscribe, Subscribe User
        if (item.message != 'Approved User' && item2.message != 'Subscribe User') {
          this.router.navigate(['/dashboard/welcome']);
        } else if (item.message == 'Approved User' && item2.message != 'Subscribe User') {
          swal('Access Denied!', "you are not subscribed to any plan! Please subscribe.", 'error');
          this.router.navigate(['/dashboard/subscription-plan']);
        }
      })
    })
  }

  ngOnInit(): void {
    this.bankInfoForm = this.fb.group({
      bankAcNumber: ['', [Validators.required]],
      attachments: ['', [Validators.required]],
      bankName: [''],
      swiftCode: [''],
      accountName: ['', [Validators.required]],
      bankAddress: ['', [Validators.required]]
    });
    this.bankAcNumber = this.bankInfoForm.controls['bankAcNumber'];
    this.attachments = this.bankInfoForm.controls['attachments'];
    this.bankName = this.bankInfoForm.controls['bankName'];
    this.swiftCode = this.bankInfoForm.controls['swiftCode'];
    this.accountName = this.bankInfoForm.controls['accountName'];
    this.bankAddress = this.bankInfoForm.controls['bankAddress'];
  }

  onSubmit(value) {
    // console.log(value);
    this.spinner.show();
    this.authService.sellerSignup(this.bankInfoForm).subscribe(
      (success) => {
        console.log(success);
        this.router.navigate(['dashboard']);
        swal('Succeed', 'You have registered successfully', 'success');
      },
      (error: any) => {
        this.error = error.error.email.toString();
        console.log(error);
        // if(error.email){
        //   swal('Failed!', error.email, 'error');
        // }
        swal('Failed!', this.error, 'error');
      }
    );
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }

  removeFile(id) {
    this.selectedImage.splice(id, 1);
  }

}
