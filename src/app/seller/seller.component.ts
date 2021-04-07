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
import { SpinnerService } from '../shared/services/spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  screenWidth: number;
  loggedInUserImg: string = '';
  activeRoute: string[];
  showSpinner: any;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private UserAuthService: UserAuthService,
    private spinner: SpinnerService,
    private ngxSpinner: NgxSpinnerService
  ) {
    router.events.subscribe((val: any) => {
      if (val.url) {
        this.activeRoute = val.url.split('/');
      }
    });
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit(): void {
    this.activeRoute = this.router.url.split('/');
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
    this.UserAuthService.s_uImg.subscribe((data) => {
      if (data != null) {
        this.loggedInUserImg = data;
      }
    });
    this.spinner.showSpinner.subscribe((item) => {
      if (item == true) {
        this.ngxSpinner.show();
      } else if (item == false) {
        this.ngxSpinner.hide();
      }
    });
  }

  @ViewChild('sidenav') sidenav: any;
  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
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
