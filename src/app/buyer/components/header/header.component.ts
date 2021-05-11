import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { GetCategoryService } from '../../../shared/services/get-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/shared/services/cart-service.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() fullName;
  loggedInUser = false;
  userName;
  uId;
  // uGroup;
  uProfilePic;
  items;
  showOnScroll;
  showAllProdDiv: boolean = false;
  categories: Observable<any>;
  currentUrl;
  showSideMenu = false;
  activeRoute: any;
  loggedInUserImg: string = '';
  cartLength: any;
  loggedInUserFullName: string = '';
  userInfo: any;
  currentLang: string;
  notification_messages: Array<any> = [];
  unread_notification_length: number;
  notifications:Array<any>=[]
  constructor(
    private UserAuthService: UserAuthService,
    private getCategory: GetCategoryService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cart: CartServiceService,
    private myElement: ElementRef,
    public translate: TranslateService,
    public notificationService: NotificationService
  ) {
    //translate.addLangs(['en', 'ar']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
      translate.use('en');
    }
    router.events.subscribe((val: any) => {
      if (val.url) {
        this.activeRoute = val.url.split('/');
        if (this.activeRoute[1] == 'home') {
          this.showOnScroll = false;
        } else {
          this.showOnScroll = true;
        }
      }
    });
  }

  ngOnInit(): void {
    console.log(this.translate.currentLang);
    this.currentLang = localStorage.getItem('locale');
    this.activeRoute = this.router.url.split('/');
    this.notificationService.getAllNotificationsForBuyer();
    this.notificationService.messages.subscribe((data: any) => {
      this.notification_messages = data;
    });
    this.notificationService.unread.subscribe((data: any) => {
      this.unread_notification_length = data;
    });
    this.notificationService.notifications.subscribe((data:any)=>{
      this.notifications=data
    })
    if (this.activeRoute[1] == 'home') {
      this.showOnScroll = false;
    } else {
      this.showOnScroll = true;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.UserAuthService.uName.subscribe((data) => {
      if (data == null) {
        this.loggedInUser = false;
      } else {
        this.loggedInUser = true;
        this.userName = data;
      }
    });
    this.UserAuthService.uImg.subscribe((data) => {
      if (data != null) {
        this.loggedInUserImg = data;
      }
    });
    this.UserAuthService.uId.subscribe((data) => {
      if (data != null) {
        this.uId = data;
        this.UserAuthService.getUser(data).subscribe((data) => {
          this.userInfo = data.data;
         /*  console.log('info', this.userInfo);
          this.loggedInUserFullName = this.userInfo.full_name;
          console.log('loggedInUserFullName', this.loggedInUserFullName); */
        });
      }
    });
   /*  if(this.uId == localStorage.getItem('uid')){
      this.UserAuthService.getUser(this.uId).subscribe((data) =>{
        this.userInfo = data.data;
        console.log('info',this.userInfo);
        this.loggedInUserFullName = this.userInfo.full_name;
        console.log("loggedInUserFullName",this.loggedInUserFullName);
      });
    } */
    // this.UserAuthService.uGroup.subscribe((data) => {
    //   if (data != null) {
    //     this.uGroup = data;
    //     // this.openSnackBar("You have logged in successfuly.", "ok");
    //     console.log('group', this.uGroup);
    //   }
    // });
    this.getCategory.category().subscribe((item) => {
      // console.log(item);
      const tempCategories: any = [];
      item.forEach((element: any) => {
        element.children.forEach((element2: any) => {
          element2.children.forEach((element3: any) => {
            tempCategories.push(element3);
          });
        });
      });
      this.categories = tempCategories;
      // console.log(this.categories)
    });
    this.cart.existingCartLength.subscribe((item) => {
      if (item == 0) this.cartLength = null;
      else this.cartLength = item;
      // alert('cart alert');
      // console.log(item);
    });
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  logout() {
    this.UserAuthService.logout();
    this.loggedInUserImg = '';
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

  showMenu() {
    this.showSideMenu = true;
    console.log(this.showSideMenu);
  }

  closeMenu() {
    this.showSideMenu = false;
  }
  gotoView() {
    this.myElement.nativeElement.ownerDocument
      .getElementById('footer')
      .scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (this.activeRoute[1] == 'home') {
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

  //lang change function
  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
    console.log(this.translate.currentLang);
    this.currentLang = language;
  }
  toggle_language(){
    if(this.translate.currentLang == 'en'){
      localStorage.setItem('locale', 'ar');
      this.translate.use('ar')
    }
    else{
      localStorage.setItem('locale', 'en');
      this.translate.use('en')
    }
  }
  markAllNotificationAsRead(){
    this.notificationService.markAllNotificationBuyer()
  }

  notification_action(index){
    if(this.notifications[index].event=='Order Created'){
      this.router.navigate(['/order/details/',this.notifications[index].event_id])
    }
    else if(this.notifications[index].event=='Order Payment'){
      this.router.navigate(['/order/details/',this.notifications[index].event_id])
    }
    else if(this.notifications[index].event == 'RFQ'){
      this.router.navigate(['/profile'],{queryParams:{activeItem:'4'}})
    }
    else if(this.notifications[index].event == 'New quotation'){
      this.router.navigate(['/profile'],{queryParams:{activeItem:'4'}})
    }
    else if(this.notifications[index].event== 'ticket.notification'){
      this.router.navigate(['/support-ticket'])
    }
  }
  go_to_quotation(){
    this.router.navigate(['/profile'],{queryParams:{activeItem:4}})
  }
}
