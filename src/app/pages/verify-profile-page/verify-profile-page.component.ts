import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
@Component({
  selector: 'app-verify-profile-page',
  templateUrl: './verify-profile-page.component.html',
  styleUrls: ['./verify-profile-page.component.css']
})
export class VerifyProfilePageComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router,private userService:UserAuthService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('token'))
    this.userService.verify_email(this.route.snapshot.paramMap.get('token')).subscribe(
      (success:any)=>{
        console.log(success)
        if(success.success==="True"){
          sessionStorage.setItem('email_verified',"true")
          console.log(sessionStorage.getItem('email_verified'))
          this.userService.emailVerificationStatus.next(true)
          this.router.navigate(['/'])
          //Promise.resolve(()=>{sessionStorage.setItem('email_verified',"true")}).then(()=>{console.log(sessionStorage.getItem('email_verified'))})
        }
      }
    )
  }

}
