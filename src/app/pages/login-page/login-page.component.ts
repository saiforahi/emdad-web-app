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
    this.authService.login(email, password).subscribe(
      success => {
        console.log(success);
        if(success.group == "buyer"){
          this.router.navigate(['']);
        }else {
          this.msg = "No user found with this credentials.";
        }
      },
      error => {
        this.error = error;
        console.log(error);
      }
    );
  }

}
