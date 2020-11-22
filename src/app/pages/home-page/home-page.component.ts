import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCategoryService } from '../../shared/services/get-category.service';
import { UserAuthService } from '../../shared/services/user-auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public user: any;
  category: Array<any> = [];

  constructor(
    private categoryServices: GetCategoryService,
    public authService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.user = {
      username: '',
      password: ''
    };
    this.categoryServices.category().subscribe(item => {
      this.category = item;
    })
  }

  login() {
    // this.authService.login({'username': this.user.username, 'password': this.user.password});
  }
 
  refreshToken() {
    this.authService.refreshToken();
  }
 
  logout() {
    this.authService.logout();
  }

}
