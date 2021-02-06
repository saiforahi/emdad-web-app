import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-buyer-signup-form',
  templateUrl: './buyer-signup-form.component.html',
  styleUrls: ['./buyer-signup-form.component.css']
})
export class BuyerSignupFormComponent implements OnInit {

  error: any;
  msg;

  constructor(
    private authService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  hide_buyer_registration():void{
    document.getElementById('buyerRegistration').style.display="none";
  }
  signup(full_name: string, email: string, phone: String, password: string) {
    this.authService.signup(full_name, email, phone, password).subscribe(
      success => {
        // this.router.navigate(['/login']);
        this.msg = success.message;
      },
      error => this.error = error
    );
  }

}
