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
import { SubscriptionService } from '../shared/services/subscription.service';
import { TranslateService } from '@ngx-translate/core';

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
  isSubscribed: boolean;
  loggedInUserFullName: string ='';
  userInfo:any;
  currentLang:string
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService,
    private spinner: SpinnerService,
    private ngxSpinner: NgxSpinnerService,
    private translate:TranslateService
  ) {
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
    this.authService.sellerIsApproved(localStorage.getItem("s_uid")).subscribe((item: any) => {
      console.log(item)
      // Approved User, User Not Approve
      this.subscription.isSubscribed().subscribe((item2: any) => {
        console.log(item2)
        this.isSubscribed = item2.message == 'Subscribe User' ? true : false;
        // User Not Subscribe, Subscribe User
        if (item.message != 'Approved User' && item2.message != 'Subscribe User') {
          this.router.navigate(['/dashboard/welcome']);
        } else if (item.message == 'Approved User' && item2.message != 'Subscribe User') {
          this.router.navigate(['/dashboard/subscription-plan']);
        }
      })
    })
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
    this.currentLang=localStorage.getItem('locale')
    this.activeRoute = this.router.url.split('/');
    this.authService.s_uName.subscribe((data) => {
      if (data == null) {
        this.loggedInUser = false;
      } else {
        this.loggedInUser = true;
        this.userName = data;
      }
    });
    this.authService.s_uId.subscribe((data) => {
      if (data != null) {
        this.uId = data;
      }
    });
    this.authService.s_uImg.subscribe((data) => {
      if (data != null) {
        this.loggedInUserImg = data;
      }
    });
   if(this.uId == localStorage.getItem('s_uid')){
     this.authService.getSeller(this.uId).subscribe((data) =>{
       this.userInfo = data.data;
       console.log("info",this.userInfo);
       this.loggedInUserFullName = this.userInfo.store_name;
       
       console.log("fullname",this.loggedInUserFullName);
     })
   }
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
    this.authService.sellerLogout();
    this.router.navigate(['dashboard/login']);
    swal('Succeed', 'You have logged out successfully', 'success');
  }

  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
    this.currentLang=language
    console.log(this.translate.currentLang)
  }
}
