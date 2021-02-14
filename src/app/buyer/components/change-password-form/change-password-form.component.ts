import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../../shared/services/user-auth.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {

  error;
  msg;

  constructor(
    private authService: UserAuthService
  ) { }

  ngOnInit(): void {
  }

  changePass(d1, d2){
    // console.log(d1, d2);
      this.authService.changePassword(d1, d2).subscribe(
        success=>{
          this.msg = success
          console.log(this.msg);
        },
        error=>this.error = error
      )
  }

}
