import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-forget-pssword-form',
  templateUrl: './forget-pssword-form.component.html',
  styleUrls: ['./forget-pssword-form.component.css'],
})
export class ForgetPsswordFormComponent implements OnInit {
  error;
  msg;

  constructor(private userAuth: UserAuthService, private router: Router, private spinner:NgxSpinnerService) {}

  ngOnInit(): void {}

  sendMail(email) {
    this.spinner.show()
    this.userAuth.forgotPassword(email).subscribe(
      (success) => {
        this.msg = success.status;
        if (this.msg == 'OK') {
          this.error = '';
          this.spinner.hide()
          this.router.navigate(['/reset-password']);
        }
      },
      (error) => {
        console.log(error);
        this.msg = '';
        this.error = error.error.email[0];
        this.spinner.hide()
      }
    );
  }
}
