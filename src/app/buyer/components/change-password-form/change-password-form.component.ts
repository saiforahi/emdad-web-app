import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css'],
})
export class ChangePasswordFormComponent implements OnInit {
  error;
  msg;
  submitted: boolean = false;
  validationMessage = null;
  passwordNotMatch: boolean = false;

  changePasswordForm = this.formBuilder.group({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    newPasswordAgain: new FormControl('', Validators.required),
  });

  constructor(
    private authService: UserAuthService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

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

  changePass() {
    this.spinner.show();
    this.passwordNotMatch = false;
    this.submitted = true;

    this.validationMessage = this.validatePassword(
      this.changePasswordForm.get('newPassword').value
    );

    if (
      this.changePasswordForm.get('newPassword').value !==
      this.changePasswordForm.get('newPasswordAgain').value
    )
      this.passwordNotMatch = true;

    if (
      this.changePasswordForm.get('currentPassword').errors === null &&
      this.changePasswordForm.get('newPassword').errors === null &&
      this.changePasswordForm.get('newPasswordAgain').errors === null &&
      this.validationMessage === null &&
      !this.passwordNotMatch
    ) {
      this.authService
        .changePassword(
          this.changePasswordForm.get('currentPassword').value,
          this.changePasswordForm.get('newPassword').value
        )
        .subscribe(
          (success) => {
            this.msg = success;
            this.spinner.hide();
            swal('Updated!', 'Password Changed Successfully', 'success');
            console.log(this.msg);
            this.submitted = false;
          },
          (error) => {
            this.error = error;
            console.log(this.error);
            swal('Failed!', this.error.error.old_password[0], 'error');
            this.spinner.hide();
            this.submitted = false;
          }
        );
    } else {
      this.spinner.hide();
    }
  }
}
