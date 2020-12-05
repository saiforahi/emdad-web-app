import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-seller-signup-form',
  templateUrl: './seller-signup-form.component.html',
  styleUrls: ['./seller-signup-form.component.css']
})
export class SellerSignupFormComponent implements OnInit {

  error: any;
  msg;

  constructor(
    private authService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signup(firstname: string, lastname: string, username: string, email: string, password: string) {
    this.authService.sellerSignup(firstname, lastname, username, email, password).subscribe(
      success => {
        // this.router.navigate(['/login']);
        this.msg = success.message;
        console.log(success)
      },
      error => this.error = error
    );
  }

}
