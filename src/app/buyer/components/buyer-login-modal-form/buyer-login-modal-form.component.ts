import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-buyer-login-modal-form',
  templateUrl: './buyer-login-modal-form.component.html',
  styleUrls: ['./buyer-login-modal-form.component.css'],
})
export class BuyerSigninFormComponent implements OnInit {
  error: any;
  msg;
  group: string;

  constructor(private authService: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    this.group = 'buyer';
  }

  hide_buyer_login() {
    document.getElementById('buyerLogin').style.display = 'none';
  }

  show_buyer_registration_modal_form(): void {
    document.getElementById('buyerLogin').style.display = 'none';
    document.getElementById('buyerRegistration').style.display = 'block';
  }

  show_forget_password(): void {
    document.getElementById('buyerLogin').style.display = 'none';
    this.router.navigate(['/forget-password']);
  }

  signin(email: string, password: string) {
    this.authService.login(email, password, this.group).subscribe(
      (success) => {
        document.getElementById('buyerLogin').style.display = 'none';
        console.log(success);
        swal('Succeed', 'You have logged in successfully', 'success');
        this.router.navigate(['/home']);
      },
      (error) => {
        this.error = error;
        console.log(error);
        swal('Failed!', error.message, 'error');
      }
    );
  }
}
