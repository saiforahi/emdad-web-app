import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private user: UserAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.user.sellerLogout();
    // this.openSnackBar('You have been logged out.', 'ok');
    console.log("logged out");
  }

}
