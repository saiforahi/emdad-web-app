import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  error;
  msg;

  constructor(private userAuth: UserAuthService, private router: Router) {}

  ngOnInit(): void {}

  resetPassword(token, pass) {
    console.log(token, pass);
    this.userAuth.resetPassword(token, pass).subscribe(
      (success) => {
        this.msg = success.status;
        if (this.msg == 'OK') {
          this.msg = 'password has been changed successfully.';
          this.error = '';
          swal('Succeed', 'Password reset successfully!', 'success');
          this.router.navigate(['/']);
        }
        console.log(success);
      },
      (error) => {
        console.log(error);
        if (error.status == 404) {
          this.msg = 'token has been expired.';
          // this.router.navigate(['/login']);
        }
        if (error.status == 400) {
          this.error = error.error.password;
          this.msg = '';
          console.log(this.error);
        }
      }
    );
  }
}
