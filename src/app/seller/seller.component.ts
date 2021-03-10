import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserAuthService } from '../shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit, AfterViewInit {
  sideMenuCollapsed = false;
  loggedInUser;
  userName: string;
  uId: any;

  @ViewChild('sidenav') sidenav: any;
  activeRoute: string[];
  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private UserAuthService: UserAuthService
  ) {
    router.events.subscribe((val: any) => {
      if(val.url)
        this.activeRoute = val.url.split("/");
      console.log(this.activeRoute);
    });
  }

  ngOnInit(): void {
    this.activeRoute = this.router.url.split('/');
    if (
      this.router.url.split('/')[2] == 'login' ||
      this.router.url.split('/')[2] == 'signup'
    ) {
    }
    this.UserAuthService.s_uName.subscribe((data) => {
      if (data == null) {
        this.loggedInUser = false;
      } else {
        this.loggedInUser = true;
        this.userName = data;
      }
    });
    this.UserAuthService.s_uId.subscribe((data) => {
      if (data != null) {
        this.uId = data;
      }
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#f9f9f9';
  }

  setSideMenuCollapseVar() {
    this.sideMenuCollapsed = !this.sideMenuCollapsed;
  }

  logout() {
    this.UserAuthService.sellerLogout();
    this.router.navigate(['dashboard/login']);
    swal('Succeed', 'You have logged out successfully', 'success');
  }
}
