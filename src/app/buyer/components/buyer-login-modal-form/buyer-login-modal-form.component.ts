import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert';
import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-buyer-login-modal-form',
  templateUrl: './buyer-login-modal-form.component.html',
  styleUrls: ['./buyer-login-modal-form.component.css'],
})
export class BuyerSigninFormComponent implements OnInit {
  error: any;
  msg;
  group: string;
  rememberMe = false;
  submitted = false;

  signInForm = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,private notificationService:NotificationService
  ) {}

  ngOnInit(): void {
    this.group = 'buyer';
    this.rememberMe = false;

    var email = localStorage.getItem('email');
    var password = localStorage.getItem('password');

    if (email !== null && email !== 'null') {
      this.signInForm.controls['email'].setValue(localStorage.getItem('email'));
      this.rememberMe = true;
    }
    if (password !== null && password !== 'null')
      this.signInForm.controls['password'].setValue(
        localStorage.getItem('password')
      );
  }

  hide_buyer_login() {
    document.getElementById('buyerLogin').style.display = 'none';
    this.signInForm.reset();
    this.submitted = false;
  }

  show_buyer_registration_modal_form(): void {
    document.getElementById('buyerLogin').style.display = 'none';
    document.getElementById('buyerRegistration').style.display = 'block';
    this.signInForm.reset();
    this.submitted = false;

    if (localStorage.getItem('email') !== 'null') {
      this.signInForm.controls['email'].setValue(localStorage.getItem('email'));
      this.rememberMe = true;
    }
    if (localStorage.getItem('password') !== 'null')
      this.signInForm.controls['password'].setValue(
        localStorage.getItem('password')
      );
  }

  show_forget_password(): void {
    document.getElementById('buyerLogin').style.display = 'none';
    this.router.navigate(['/forget-password']);
    this.rememberMe = false;
  }

  signin() {
    this.spinner.show();
    var email = this.signInForm.get('email');
    var password = this.signInForm.get('password');
    this.submitted = true;

    if (email.errors === null && password.errors === null) {
      this.authService.login(email.value, password.value, this.group).subscribe(
        (success) => {
          document.getElementById('buyerLogin').style.display = 'none';
           console.log(success);
           if(success.success==='False'){
            this.spinner.hide();
            swal('Wrong', success.message, 'error');
           }
           else{
            if (this.rememberMe) {
              localStorage.setItem('email', email.value);
              localStorage.setItem('password', password.value);
            } else {
              localStorage.removeItem('email');
              localStorage.removeItem('password');
              this.signInForm.reset();
            }
            this.submitted = false;
            this.notificationService.getAllNotificationsForBuyer()
            this.spinner.hide();
            this.router.navigate(['/home']);
           }
        },
        (error) => {
          this.submitted = false;
          this.error = error;
          this.spinner.hide();
          swal('Failed!', 'User with this credential not found', 'error');
        }
      );
    } else {
      this.spinner.hide();
    }
  }
}
