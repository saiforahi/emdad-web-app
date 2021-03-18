import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  error;
  msg;

  constructor(private userAuth: UserAuthService, private router: Router,private spinner:NgxSpinnerService) {}

  ngOnInit(): void {}

  resetPassword(token, pass) {
    console.log(token, pass);
    this.spinner.show()
    this.userAuth.resetPassword(token, pass).subscribe(
      (success) => {
        this.msg = success.status;
        if (this.msg == 'OK') {
          this.msg = 'password has been changed successfully.';
          this.error = '';
          this.spinner.hide()
          swal('Succeed', 'Password reset successfully!', 'success');
          this.router.navigate(['/']);
        }
      },
      (error) => {
        if (error.status == 404) {
          this.msg = 'token has been expired.';
          // this.router.navigate(['/login']);
        }
        if (error.status == 400) {
          this.error = error.error.password;
          this.msg = '';
        }
        this.spinner.hide()
      }
    );
  }
}
