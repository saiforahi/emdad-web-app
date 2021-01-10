import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../shared/services/user-auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  error: any;
  msg;
  group: string;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.group = this.router.url.split("/", 3)[1];
    console.log(this.group)
  }

  login(email: string, password: string) {
    this.authService.login(email, password, this.group).subscribe(
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
