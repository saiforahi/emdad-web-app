import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-buyer-registration-modal-form',
  templateUrl: './buyer-registration-modal-form.component.html',
  styleUrls: ['./buyer-registration-modal-form.component.css'],
})
export class BuyerRegistrationFormComponent implements OnInit {
  error: any;
  click: boolean = false;
  msg;
  passwordNotMatch: boolean = false;
  submitted: boolean = false;
  passwordValidationMessage: any = null;
  // full_name: string = '';
  // email: string = '';
  // phone: string = '';
  // password: string = '';
  // confirm_pass: string = '';

  signUpForm = this.formBuilder.group({
    full_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_pass: new FormControl('', Validators.required),
  });

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.click = false;
  }

  hide_buyer_registration() {
    document.getElementById('buyerRegistration').style.display = 'none';
    this.signUpForm.reset();
    this.submitted = false;
    this.passwordNotMatch = false;
  }

  show_login_modal_form() {
    document.getElementById('buyerRegistration').style.display = 'none';
    document.getElementById('buyerLogin').style.display = 'block';
    this.signUpForm.reset();
    this.submitted = false;
    this.passwordNotMatch = false;
  }

  validatePassword(password: string) {
    var containsChracter = false;
    var containsDigit = false;

    var numbers: string = '1234567890';
    var i;
    for (i = 0; i < password.length; i++) {
      if (!numbers.includes(password[i])) {
        containsChracter = true;
      }
      if (numbers.includes(password[i])) {
        containsDigit = true;
      }
    }

    if (!containsDigit) return 'Password should contains at least one digit';
    if (!containsChracter)
      return 'Password should contains at least one character';
    if (password.length < 8) return 'Password length should be 8 characters';
    return null;
  }

  signup() {
    this.spinner.show();

    var full_name = this.signUpForm.get('full_name');
    var email = this.signUpForm.get('email');
    var phone = this.signUpForm.get('phone');
    var password = this.signUpForm.get('password');
    var confirm_pass = this.signUpForm.get('confirm_pass');
    this.submitted = true;
    this.passwordValidationMessage = null;

    if (password.value !== confirm_pass.value) {
      this.passwordNotMatch = true;
    } else {
      this.passwordNotMatch = false;
    }

    if (this.validatePassword(password.value)) {
      this.passwordValidationMessage = this.validatePassword(password.value);
    }

    if (
      full_name.errors === null &&
      email.errors === null &&
      password.errors === null &&
      !this.passwordNotMatch &&
      this.passwordValidationMessage === null
    ) {
      this.click = true;
      this.authService
        .signup(full_name.value, email.value, phone.value, password.value)
        .subscribe(
          (success) => {
            // this.router.navigate(['/login']);
            this.msg = success.message;
            console.log(success);
            this.spinner.hide();
            this.click = false;
            this.submitted = false;
            if (success.success === 'True') {
              this.hide_buyer_registration();
              swal('Succeed!', this.msg, 'success');
            }
          },
          (error) => {
            // ****************
            // only handling email error; need to update
            // ****************
            this.spinner.hide();
            this.click = false;
            this.error = error.error.email[0];
            swal('Failed!', this.error, 'error');
          }
        );
    } else {
      this.spinner.hide();
    }
  }
}
