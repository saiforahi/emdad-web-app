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
import { WebSocketBridge } from 'django-channels'
import { NotificationService } from '../shared/services/notification.service';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})
export class SellerComponent implements OnInit, AfterViewInit {
  webSocketBridge = new WebSocketBridge()
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
  notifications:Array<any>=[]
  unread_notification_length:number
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService,
    private spinner: SpinnerService,
    private ngxSpinner: NgxSpinnerService,
    private translate:TranslateService,
    private notificationService:NotificationService
  ) {
    this.webSocketBridge.connect('ws://103.123.8.52:8002/ws/notifications');
    this.webSocketBridge.addEventListener("message", function(event) {
      // console.log('notification',event.data);
      // alert(event.data.message)
      notificationService.refresh_notification_details()
    });
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
    this.authService.s_uId.subscribe((s_uid) => {
      console.log(s_uid);
      if (s_uid != null) {
        this.authService.sellerIsApproved(s_uid).subscribe((item: any) => {
          console.log(item);
          // Approved User, User Not Approve
          this.subscription.isSubscribed().subscribe((item2: any) => {
            console.log(item2);
            this.isSubscribed = item2.message == 'Subscribe User' ? true : false;
            // User Not Subscribe, Subscribe User
            if (
              item.message != 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              this.router.navigate(['/dashboard/welcome']);
            } else if (
              item.message == 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              swal(
                'Access Denied!',
                'you are not subscribed to any plan! Please subscribe.',
                'error'
              );
              this.router.navigate(['/dashboard/subscription-plan']);
            }
          });
        });
      }
    });
    router.events.subscribe((val: any) => {
      if (val.url && val instanceof NavigationEnd) {
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
    this.initialize_notification()
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
        if (this.uId == localStorage.getItem('s_uid')) {
          this.authService.getSeller(this.uId).subscribe((data) => {
            this.loggedInUserFullName = data.data.store_name;
            //  console.log("fullname",this.loggedInUserFullName);
          });
        }
      }
    });
    this.authService.s_uImg.subscribe((data) => {
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

  //initialize notifications
  initialize_notification(){
    this.notificationService.getAllNotificationsForSeller()
    this.notificationService.s_unread.subscribe((data)=>{
      if(data!=null){
        this.unread_notification_length=data
      }
    })
    this.notificationService.s_notifications.subscribe((messages)=>{
      this.notifications=messages
    })
  }
  toggle_language(){
    if(this.translate.currentLang == 'en'){
      localStorage.setItem('locale', 'ar');
      this.translate.use('ar')
      this.currentLang='ar'
    }
    else{
      localStorage.setItem('locale', 'en');
      this.translate.use('en')
      this.currentLang='en'
    }
  }
  markAllNotificationAsRead(){
    console.log('marking...')
    this.notificationService.markAllNotificationSeller()
  }

  notification_action(index:any){
    console.log(this.notifications[index])
    if(this.notifications[index].event=='Order Created'){
      this.router.navigate(['/dashboard/current-orders'])
    }
    else if(this.notifications[index].event=='Order Payment'){
      this.router.navigate(['/dashboard/current-orders'])
    }
    else if(this.notifications[index].event == 'RFQ'){
      this.router.navigate(['/dashboard/manage-rfqs'])
    }
    else if(this.notifications[index].event== "Ticket Status Update"){
      this.router.navigate(['/support'])
    }
    else if(this.notifications[index].event == "Subscription Payment"){
      this.router.navigate(['/payment-history'])
    }
  }
}
