import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryListService } from 'src/app/shared/services/country-list.service';
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
    private authService: UserAuthService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.changePassForm = this.fb.group({
      crntPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confPassword: ['', [Validators.required]],
    });
    this.crntPassword = this.changePassForm.controls['crntPassword'];
    this.newPassword = this.changePassForm.controls['newPassword'];
    this.confPassword = this.changePassForm.controls['confPassword'];
  }

  onSubmit(value) {
    // console.log(value);
    this.spinner.show();
    this.authService.sellerChangePassword(value.crntPassword, value.newPassword).subscribe(
      (success) => {
        // console.log(success);
        this.spinner.hide();
        swal('Succeed', 'You have changed password successfully', 'success');
      },
      (error: any) => {
        console.log(error);
        swal('Failed!', this.error, 'error');
      }
    );
    this.changePassForm.reset();
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
