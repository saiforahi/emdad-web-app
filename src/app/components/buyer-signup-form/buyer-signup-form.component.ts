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

  signup(full_name: string, email: string, phone: String, password: string) {
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
