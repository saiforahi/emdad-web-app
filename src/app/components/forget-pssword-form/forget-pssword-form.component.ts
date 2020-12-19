import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-forget-pssword-form',
  templateUrl: './forget-pssword-form.component.html',
  styleUrls: ['./forget-pssword-form.component.css'],
})
export class ForgetPsswordFormComponent implements OnInit {
  error;
  msg;

  constructor(private userAuth: UserAuthService, private router: Router) {}

  ngOnInit(): void {}

  sendMail(email) {
    this.userAuth.forgotPassword(email).subscribe(
      (success) => {
        this.msg = success.status;
        if (this.msg == 'OK') {
          this.error = '';
          this.router.navigate(['/reset-password']);
        }
      },
      (error) => {
        console.log(error);
        this.msg = '';
        this.error = error.error.email[0];
      }
    );
  }
}
