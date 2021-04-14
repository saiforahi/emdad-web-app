import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-seller-change-pass-page',
  templateUrl: './seller-change-pass-page.component.html',
  styleUrls: ['./seller-change-pass-page.component.css']
})
export class SellerChangePassPageComponent implements OnInit {
  error: any;
  msg;
  group: string;
  changePassForm: FormGroup;
  crntPassword: AbstractControl;
  newPassword: AbstractControl;
  confPassword: AbstractControl;
  changePassFormData = new FormData();
  passMatched: boolean;
  showPassState: boolean;
  confShowPassState: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: UserAuthService,
    private subscription: SubscriptionService
  ) {
    
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
    this.changePassForm = this.fb.group({
      crntPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required,Validators.minLength(8)]],
      confPassword: ['', [Validators.required,Validators.minLength(8)]],
    });
    this.crntPassword = this.changePassForm.controls['crntPassword'];
    this.newPassword = this.changePassForm.controls['newPassword'];
    this.confPassword = this.changePassForm.controls['confPassword'];
  }

  onSubmit(value) {
    // console.log(value);
    if(value.crntPassword!=value.newPassword){
      this.spinner.show();
      this.authService.sellerChangePassword(value.crntPassword, value.newPassword).subscribe(
        (success) => {
          // console.log(success);
          this.spinner.hide();
          swal('Succeed', 'You have changed password successfully', 'success');
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide()
          if(error.error.old_password[0]){
            swal('Failed!', error.error.old_password[0], 'error');
          }
          else{
            swal('Failed!', 'Internal Server Error', 'error');
          }
        }
      );
      this.changePassForm.reset();
    }
    else{
      swal('Hold On!','Your new password is same to your old password','warning')
    }
    
  }

  matchBothPassord(pass1, pass2){
    // console.log(pass1, pass2);
    if(pass1 != pass2){
      // console.log(pass1, pass2);
      this.passMatched = true;
    }else {
      this.passMatched = false;
    }
  }

  showPass() {
    this.showPassState = true;
  }

  hidePass() {
    this.showPassState = false;
  }

  confShowPass() {
    this.confShowPassState = true;
  }

  confHidePass() {
    this.confShowPassState = false;
  }

}
