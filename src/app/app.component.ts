import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from './shared/services/user-auth.service';
// import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // @ViewChild('menu', { static: true }) menu: MatMenuModule;

  title = 'emdad-web-app';
  loggedInUser = false;
  userName;
  uId;
  uGroup;
  items;

  constructor(
    private UserAuthService: UserAuthService
  ) {}

  ngOnInit() {
    this.UserAuthService.uName.subscribe((data) => {
      if (data == null) {
        this.loggedInUser = false;
      } else {
        this.loggedInUser = true;
        this.userName = data;
      }
    });
    this.UserAuthService.uId.subscribe((data) => {
      if (data != null) {
        this.uId = data;
      }
    });
    this.UserAuthService.uGroup.subscribe((data) => {
      if (data != null) {
        this.uGroup = data;
        console.log('group', this.uGroup);
      }
    });
  }

  logout() {
    this.UserAuthService.logout();
  }

  // scrollTop = 0;
  // hideNav = false;
  // @HostListener("window:scroll")
  // onWindowScroll() {
  //   let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
  //   let max = document.documentElement.scrollHeight;
  //   // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
  //   if (pos >= 700) {
  //     //Do your action here
  //     this.hideNav = true;
  //     console.log(this.hideNav);
  //   }else {
  //     this.hideNav = false;
  //     console.log(this.hideNav);
  //   }
  // }
}
