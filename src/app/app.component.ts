import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './shared/services/user-auth.service';
import { GetCategoryService } from './shared/services/get-category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'emdad-web-app';
  loggedInUser = false;
  userName;
  uId;
  items;

  constructor(
    private UserAuthService: UserAuthService,
    private categoryServices: GetCategoryService
  ) { }

  ngOnInit() {
    this.UserAuthService.uName.subscribe(data => {
      if(data == null){
        this.loggedInUser = false;
      }else {
        this.loggedInUser = true;
        this.userName = data;
      }
    })
    this.UserAuthService.uId.subscribe(data => {
      if(data != null){
        this.uId = data;
      }
    })
    this.categoryServices.category().subscribe(item => {
      this.removeEmptyChildren(item);
      this.items = item;
    });
  }

  logout() {
    this.UserAuthService.logout();
  }

  removeEmptyChildren(data) {
    data.forEach(key => {
      key.children.forEach(key2 => {
        key2.children.forEach(key3 => {
          key3.children.forEach(key4 => {
            key3.children.forEach(key5 => {
              if (key5.children.length == 0) {
                delete key5.children;
              }
            });
            if (key4.children.length == 0) {
              delete key4.children;
            }
          });
          if (key3.children.length == 0) {
            delete key3.children;
          }
        });
        if (key2.children.length == 0) {
          delete key2.children;
        }
      });
      if (key.children.length == 0) {
        delete key.children;
      }
    });
  }
}
