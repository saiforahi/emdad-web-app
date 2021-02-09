import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from './shared/services/user-auth.service';
import { GetCategoryService } from './shared/services/get-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'emdad-web-app';
  loggedInUser = false;
  userName;
  uId;
  uGroup;
  items;
  showOnScroll = false;
  showAllProdDiv: boolean = false;
  categories: any;
  currentUrl;

  constructor(
    private UserAuthService: UserAuthService,
    private getCategory: GetCategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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
        // this.openSnackBar("You have logged in successfuly.", "ok");
        console.log('group', this.uGroup);
      }
    });
    this.getCategory.category().subscribe((item) => {
      // console.log(item);
      this.categories = item;
    });
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  logout() {
    this.UserAuthService.logout();
    this.openSnackBar('You have been logged out.', 'ok');
  }

  show_lang_drop() {
    if (document.getElementById('lang-drop-down').classList.contains('show')) {
      document.getElementById('lang-drop-down').classList.remove('show');
    } else {
      document.getElementById('lang-drop-down').classList.add('show');
    }
  }

  handle_accnt_drop_down() {
    if (document.getElementById('accnt-drop-down').classList.contains('show')) {
      document.getElementById('accnt-drop-down').classList.remove('show');
      document.getElementById('en-btn').setAttribute('area-expanded', 'false');
    } else {
      document.getElementById('en-btn').setAttribute('area-expanded', 'true');
      document.getElementById('accnt-drop-down').classList.add('show');
    }
  }

  handle_notification_drop() {
    if (document.getElementById('noti-panel').classList.contains('show')) {
      document.getElementById('noti-panel').classList.remove('show');
    } else if (
      !document.getElementById('noti-panel').classList.contains('show')
    ) {
      document.getElementById('noti-panel').classList.add('show');
    }
  }

  show_buyer_login() {
    document.getElementById('buyerRegistration').style.display = 'none';
    document.getElementById('buyerLogin').style.display = 'block';
  }

  show_buyer_registration() {
    document.getElementById('buyerLogin').style.display = 'none';
    document.getElementById('buyerRegistration').style.display = 'block';
  }

  showAllProdlist() {
    this.showAllProdDiv = !this.showAllProdDiv;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos >= 1100) {
      //Do your action here
      this.showOnScroll = true;
      // console.log(pos, this.showOnScroll);
    } else {
      this.showOnScroll = false;
      // console.log(pos, this.showOnScroll);
    }
  }
}
