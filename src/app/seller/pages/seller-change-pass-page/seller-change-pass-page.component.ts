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
  password: AbstractControl;
  confPassword: AbstractControl;
  newPassword: AbstractControl;
  changePassFormData = new FormData();
  countryList: any;
  cityList: any;
  passMatched: boolean;
  showPassState: boolean;
  confShowPassState: boolean;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.contry.allCountries().subscribe(item => {
      this.countryList = item.data;
    })
    this.changePassForm = this.fb.group({
      password: ['', [Validators.required]],
      confPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    });
    this.password = this.changePassForm.controls['password'];
    this.confPassword = this.changePassForm.controls['confPassword'];
    this.newPassword = this.changePassForm.controls['newPassword'];
  }

  onSubmit(value) {
    // console.log(value);
    this.spinner.show();
    this.authService.sellerSignup(this.changePassForm).subscribe(
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

  getciTyList(id){
    this.contry.allCities(id).subscribe(item => {
      this.cityList = item.data;
    })
  }

  matchBothPassord(pass1, pass2){
    console.log(pass1, pass2);
    if(pass1 != pass2){
      console.log(pass1, pass2);
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
