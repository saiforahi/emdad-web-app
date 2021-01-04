import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  error: any;
  msg;

  constructor(
    private authService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    const group = "seller";
    this.authService.login(email, password, group).subscribe(
      success => {
        console.log(success);
        this.router.navigate(['']);
      },
      error => {
        this.error = error;
        console.log(error);
      }
    );
  }

}
