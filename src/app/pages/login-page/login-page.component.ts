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

  constructor(
    private authService: UserAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      success => this.router.navigate(['home']),
      error => this.error = error
    );
  }

}
