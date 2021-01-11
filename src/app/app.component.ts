import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from './shared/services/user-auth.service';
import { GetCategoryService } from './shared/services/get-category.service';

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

  constructor(
    private UserAuthService: UserAuthService,
    private getCategory: GetCategoryService
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
    this.getCategory.category().subscribe(item =>{
      // console.log(item);
      this.categories = item;
    })
  }

  logout() {
    this.UserAuthService.logout();
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
