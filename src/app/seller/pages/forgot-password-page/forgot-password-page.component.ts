import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../../shared/services/user-auth.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import swal from 'sweetalert';
@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {

  constructor(private userAuthService:UserAuthService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }

  submit_reset_password(email){
    console.log(email)
    this.userAuthService.forgotPassword(email).subscribe(
      (success)=>{
        if(success.status==="OK"){
          swal("Succeed","Request Submitted","success")
          this.router.navigate(['reset-password'])
        }
      },
      (error)=>{

      }
    )
  }

}
