import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-buyer-login-modal-form',
  templateUrl: './buyer-login-modal-form.component.html',
  styleUrls: ['./buyer-login-modal-form.component.css']
})
export class BuyerSigninFormComponent implements OnInit {

  error: any;
  msg;

  constructor(
    private authService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  hide_buyer_login(){
    document.getElementById('buyerLogin').style.display="none";
  }
  show_buyer_registration_modal_form():void{
    document.getElementById('buyerLogin').style.display="none";
    document.getElementById('buyerRegistration').style.display="block";
  }
  show_forget_password():void{
    document.getElementById('buyerLogin').style.display="none";
    this.router.navigate(['/forget-password']);
  }
  signin(full_name: string, email: string, phone: String, password: string) {
    this.authService.signup(full_name, email, phone, password).subscribe(
      success => {
        // this.router.navigate(['/login']);
        this.msg = success.message;
        console.log(success)
      },
      error => this.error = error
    );
  }

}
