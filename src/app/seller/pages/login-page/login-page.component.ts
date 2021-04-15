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
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

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
  currentLang:any
  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private notificationService:NotificationService,
    public translate:TranslateService
  ) {}

  ngOnInit(): void {
    this.currentLang=this.translate.currentLang
    this.spinner.hide();
    this.group = this.router.url.split('/', 3)[1];
    console.log(this.group);
    this.sellerLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.email = this.sellerLoginForm.controls['email'];
    this.password = this.sellerLoginForm.controls['password'];
  }

  onSubmit(value:any) {
    this.spinner.show();
    // console.log(value);
    this.authService.login(value.email, value.password, 'seller').subscribe(
      (success) => {
        console.log(success);
        this.spinner.hide();
        if (success.success == 'True') {
          this.notificationService.getAllNotificationsForSeller()
          swal('Succeed', success.message, 'success');
          this.router.navigate(['dashboard']);
        } else {
          swal('Failed!', success.message, 'error');
          this.router.navigate(['dashboard']);
        }
      },
      (error) => {
        this.error = error;
        console.log(error);
        this.spinner.hide();
        swal('Failed!', error.error.message, 'error');
      }
    );
  }

  showPass() {
    this.showPassState = true;
  }

  toggle_language(){
    if(this.translate.currentLang == 'en'){
      localStorage.setItem('locale', 'ar');
      this.translate.use('ar')
      this.currentLang='ar'
    }
    else{
      localStorage.setItem('locale', 'en');
      this.translate.use('en')
      this.currentLang='en'
    }
  }
  hidePass() {
    this.showPassState = false;
  }
}
