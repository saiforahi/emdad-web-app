import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  userId;
  userInfo;
  changePass = false;
  error;

  constructor(
    private authService: UserAuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if(this.userId == localStorage.getItem('uid')){
      this.authService.getUser(this.userId).subscribe(data=>{
        console.log(data);
        this.userInfo = data;
      },
      error=>this.error = error
      )
    }else {
      alert("access is denied");
    }
  }

}
