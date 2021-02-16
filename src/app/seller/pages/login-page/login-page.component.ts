import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  error: any;
  msg;
  group: string;
  sellerLoginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  showPassState: boolean = false;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.group = this.router.url.split('/', 3)[1];
    console.log(this.group);
    this.sellerLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.email = this.sellerLoginForm.controls['email'];
    this.password = this.sellerLoginForm.controls['password'];
  }

  onSubmit(value) {
    // login code goes here
    console.log(value);
    this.authService.login(value.email, value.password, 'seller').subscribe(
      (success) => {
        console.log(success);
        this.router.navigate(['dashboard']);
        swal('Succeed', 'You have logged in successfully', 'success');
      },
      (error) => {
        this.error = error;
        console.log(error);
        swal('Failed!', error.message, 'error');
      }
    );
  }

  showPass() {
    this.showPassState = true;
  }

  hidePass() {
    this.showPassState = false;
  }

  // login(email: string, password: string) {
  //   this.authService.login(email, password, this.group).subscribe(
  //     (success) => {
  //       console.log(success);
  //       this.router.navigate(['']);
  //     },
  //     (error) => {
  //       this.error = error;
  //       console.log(error);
  //     }
  //   );
  // }
}
