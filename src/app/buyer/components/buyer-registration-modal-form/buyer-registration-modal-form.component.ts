import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from '../../../shared/services/user-auth.service';

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
    private formBuilder: FormBuilder
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

  signup() {
    var full_name = this.signUpForm.get('full_name');
    var email = this.signUpForm.get('email');
    var phone = this.signUpForm.get('phone');
    var password = this.signUpForm.get('password');
    var confirm_pass = this.signUpForm.get('confirm_pass');
    this.submitted = true;

    if (password.value !== confirm_pass.value) {
      this.passwordNotMatch = true;
    } else {
      this.passwordNotMatch = false;
    }

    if (
      full_name.errors === null &&
      email.errors === null &&
      password.errors === null &&
      !this.passwordNotMatch
    ) {
      this.click = true;
      this.authService
        .signup(full_name.value, email.value, phone.value, password.value)
        .subscribe(
          (success) => {
            // this.router.navigate(['/login']);
            this.msg = success.message;
            console.log(success);
            if (success.success === 'True') {
              this.hide_buyer_registration();
              swal('Succeed!', this.msg, 'success');
            }
          },
          (error) => {
            // ****************
            // only handling email error; need to update
            // ****************
            this.error = error.error.email[0];
            swal('Failed!', this.error, 'error');
            this.click = false;
          }
        );
    }
  }
}
