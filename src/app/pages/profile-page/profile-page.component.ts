import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  userId;
  userInfo;
  changePass = false;
  editProfile = false;

  constructor(
    private authService: UserAuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId == localStorage.getItem('uid')) {
      this.authService.getUser(this.userId).subscribe((data) => {
        this.userInfo = data.data;
        // console.log(this.userInfo);
      });
    } else {
      alert('access is denied');
    }
  }

  setEditProfile(editProfile: boolean) {
    this.editProfile = editProfile;
  }
}
