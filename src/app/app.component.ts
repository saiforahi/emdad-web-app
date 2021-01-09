import { Component, OnInit, ViewChild } from '@angular/core';
import { UserAuthService } from './shared/services/user-auth.service';
import { GetCategoryService } from './shared/services/get-category.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  @ViewChild("menu", {static: true}) menu: MatMenuModule;

  title = 'emdad-web-app';
  loggedInUser = false;
  userName;
  uId;
  uGroup;
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
    this.UserAuthService.uGroup.subscribe(data => {
      if(data != null){
        this.uGroup = data;
        console.log("group", this.uGroup);
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
  show_buyer_login(){
    document.getElementById('buyerRegistration').style.display="none";
    document.getElementById('buyerLogin').style.display="block";
  }
  show_buyer_registration(){
    document.getElementById('buyerLogin').style.display="none";
    document.getElementById('buyerRegistration').style.display="block";
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
