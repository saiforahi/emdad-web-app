import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  signup(firstname: string, lastname: string, username: string, email: string, password: string) {
    this.authService.signup(firstname, lastname, username, email, password).subscribe(
      success => {
        // this.router.navigate(['/login']);
        this.msg = success.message;
        console.log(success)
      },
      error => this.error = error
    );
  }

}
