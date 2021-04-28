import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { config } from '../../../config';
import { SubscriptionService } from './subscription.service';
import { Cart } from '../models/Cart.model';
import { NotificationService } from './notification.service';

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
  profile_pic: string;
  full_name:string;
}

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private apiRoot = config.base_url + 'auth/';
  uName: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  uId: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  uImg: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  uFullName:BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // uGroup: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  s_uName: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  s_uId: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  s_uImg: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  emailVerificationStatus: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private http: HttpClient, private router: Router,private notificationService:NotificationService) {
    this.uName.next(localStorage.getItem('username'));
    this.uId.next(localStorage.getItem('uid'));
    this.uImg.next(localStorage.getItem('uimg'));
    this.uFullName.next(localStorage.getItem('ufullname'));
    this.s_uName.next(localStorage.getItem('s_username'));
    this.s_uId.next(localStorage.getItem('s_uid'));
    this.s_uImg.next(localStorage.getItem('s_uimg'));
    // this.uGroup.next(localStorage.getItem('group'));
  }

  private setSession(authResult) {
    if (authResult.token != undefined) {
      const token = authResult.token;
      const payload = <JWTPayload>jwt_decode(token);
      console.log(payload);
      if (authResult.group == 'buyer') {
        const expiresAt = moment.unix(payload.exp);
        localStorage.setItem('token', authResult.token);
        localStorage.setItem('username', payload.username);
        localStorage.setItem('ufullname',authResult.full_name);
        if (authResult.profile_pic.length > 0)
          localStorage.setItem(
            'uimg',
            config.img_base_url + authResult.profile_pic
          );
        else localStorage.setItem('uimg', authResult.profile_pic);
        localStorage.setItem('uid', JSON.stringify(payload.user_id));
        // localStorage.setItem('group', authResult.group);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        this.uName.next(localStorage.getItem('username'));
        this.uImg.next(localStorage.getItem('uimg'));
        this.uId.next(localStorage.getItem('uid'));
        this.uFullName.next(localStorage.getItem('ufullname'));
        console.log('name',this.uFullName);
        // this.notificationService.getAllNotificationsForBuyer()
        // this.uGroup.next(localStorage.getItem('group'));
      }
      if (authResult.group == 'seller') {
        const expiresAt = moment.unix(payload.exp);
        localStorage.setItem('s_token', authResult.token);
        // localStorage.setItem('group', authResult.group);
        localStorage.setItem('s_username', payload.username);
        if (authResult.profile_pic.length > 0)
          localStorage.setItem(
            's_uimg',
            config.img_base_url + authResult.profile_pic
          );
        else localStorage.setItem('s_uimg', authResult.profile_pic);
        localStorage.setItem('s_uid', JSON.stringify(payload.user_id));
        localStorage.setItem(
          's_expires_at',
          JSON.stringify(expiresAt.valueOf())
        );
        localStorage.setItem('is_approved', authResult.is_approved);
        this.s_uName.next(localStorage.getItem('s_username'));
        this.s_uId.next(localStorage.getItem('s_uid'));
        this.s_uImg.next(localStorage.getItem('s_uimg'));
        // this.notificationService.getAllNotificationsForSeller()
        // this.uGroup.next(localStorage.getItem('group'));
      }
    }
  }

  // get token(): string {
  //   return localStorage.getItem('token');
  // }

  login(email: string, password: string, group: String): Observable<any> {
    var data = { email: email, password: password, group: group };
    return this.http.post(config.base_url + 'api/login/', data).pipe(
      tap((response) => {
        console.log(response);
        this.clear_seller_data();
        this.removeBuyerData();
        this.setSession(response);
      }),
      shareReplay()
    );
  }

  getUser(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(
      config.base_url + 'api/profile/details/' + id + '/',
      httpOptions
    );
  }

  getSeller(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('s_token'),
      }),
    };
    return this.http.get(
      config.base_url + 'api/profile/details/' + id + '/',
      httpOptions
    );
  }

  signup(
    full_name: String,
    email: String,
    phone: String,
    password: String
  ): Observable<any> {
    return this.http
      .post(config.base_url + 'api/buyer/registration/', {
        full_name,
        email,
        phone,
        password,
      })
      .pipe(shareReplay());
  }

  sellerSignup(data): Observable<any> {
    return this.http
      .post(config.base_url + 'api/seller/registration/', data)
      .pipe(shareReplay());
  }
  removeBuyerData(){
    this.notificationService.notifications.next([])
    this.notificationService.messages.next([])
    this.notificationService.unread.next(0)
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('uid');
    localStorage.removeItem('uimg');
    localStorage.removeItem('ufullname');
    // localStorage.removeItem('uGroup');
    localStorage.removeItem('expires_at');
    this.uName.next(null);
    this.uImg.next(null);
    this.uId.next(null);
    this.uFullName.next(null);
  }
  logout() {
    this.notificationService.notifications.next([])
    this.notificationService.messages.next([])
    this.notificationService.unread.next(0)
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('uid');
    localStorage.removeItem('uimg');
    localStorage.removeItem('ufullname');
    // localStorage.removeItem('uGroup');
    localStorage.removeItem('expires_at');
    this.uName.next(null);
    this.uImg.next(null);
    this.uId.next(null);
    this.uFullName.next(null);
    // this.uGroup.next(null);

    // for remeberMe case email and password will be stored
    var email = localStorage.getItem('email');
    var password = localStorage.getItem('password');

    //localStorage.clear();

    if (
      email !== 'null' &&
      email !== null &&
      password !== 'null' &&
      password !== null
    ) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
    this.router.navigate(['/home']);
  }
  
  clear_seller_data(){
    this.notificationService.s_notifications.next([])
    this.notificationService.s_messages.next([])
    this.notificationService.s_unread.next(0)
    localStorage.removeItem('s_token');
    localStorage.removeItem('s_username');
    localStorage.removeItem('s_uid');
    // localStorage.removeItem('uGroup');
    localStorage.removeItem('s_expires_at');
    this.s_uName.next(null);
    this.s_uId.next(null);
  }
  sellerLogout() {
    this.clear_seller_data()
    // this.uGroup.next(null);
    localStorage.clear();
    this.router.navigate(['/dashboard/login']);
  }

  refreshToken() {
    if (
      moment().isBetween(
        this.getExpiration().subtract(2, 'days'),
        this.getExpiration()
      )
    ) {
      return this.http
        .post(config.base_url + 'auth/refresh-token/', {
          access: localStorage.getItem('token'),
        })
        .pipe(
          tap((response) => this.setSession(response)),
          shareReplay()
        )
        .subscribe();
    }
  }

  sellerRefreshToken() {
    if (
      moment().isBetween(
        this.getExpiration().subtract(2, 'days'),
        this.getExpiration()
      )
    ) {
      return this.http
        .post(this.apiRoot.concat('refresh-token/'), {
          token: localStorage.getItem('s_token'),
        })
        .pipe(
          tap((response) => this.setSession(response)),
          shareReplay()
        )
        .subscribe();
    }
  }

  verify_email(token: string) {
    return this.http.get(
      config.base_url + 'api/registration/profile/verify/' + token + '/'
    );
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  sellerGetExpiration() {
    const expiration = localStorage.getItem('s_expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  sellerIsLoggedIn() {
    return moment().isBefore(this.sellerGetExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  sellerIsLoggedOut() {
    return !this.sellerIsLoggedIn();
  }

  changePassword(old_password, new_password) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.put(
      config.base_url + 'api/change/password/',
      { old_password, new_password },
      httpOptions
    );
  }

  sellerChangePassword(old_password, new_password) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('s_token'),
      }),
    };
    return this.http.put(
      config.base_url + 'api/change/password/',
      { old_password, new_password },
      httpOptions
    );
  }

  forgotPassword(email): Observable<any> {
    return this.http.post(config.base_url + 'api/password_reset/', {
      email,
    });
  }

  resetPassword(token, password): Observable<any> {
    return this.http.post(config.base_url + 'api/password_reset/confirm/', {
      token,
      password,
    });
  }

  updateProfile(userId: number, user: any) {
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    var updateURL =
      config.base_url + 'api/buyer/profile/update/' + userId + '/';
    return this.http.post(updateURL, user, httpOptions).pipe(shareReplay());
  }

  updateSellerProfile(userId, user: any) {
    console.log(user);
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('s_token'),
      }),
    };
    const updateURL =
      config.base_url + 'api/seller/profile/update/' + userId + '/';
    return this.http.post(updateURL, user, httpOptions).pipe(shareReplay());
  }

  deleteSellerAttachments(column_name) {
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('s_token'),
      }),
    };
    const updateURL =
      config.base_url +
      'api/user/file/delete/' +
      localStorage.getItem('s_uid') +
      '/' +
      column_name +
      '/';
    return this.http.get(updateURL, httpOptions);
  }

  uploadSellerProfilePic(userId, pro_pic) {
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('s_token'),
      }),
    };
    const updateURL =
      config.base_url + 'api/change/profile/image/' + userId + '/';
    return this.http.post(updateURL, pro_pic, httpOptions);
  }

  uploadSellerBannerPic(userId, store_pic) {
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('s_token'),
      }),
    };
    const updateURL =
      config.base_url + 'api/change/store/image/' + userId + '/';
    return this.http.post(updateURL, store_pic, httpOptions);
  }

  sellerIsApproved(userId:any){
    console.log('user id from param',userId)
    const updateURL =
      config.base_url + 'api/user/approve/check/' + userId + '/';
    return this.http.get(updateURL);
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '.concat(token)),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class SellerAuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('s_token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '.concat(token)),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private UserAuthService: UserAuthService,
    private router: Router
  ) {}

  canActivate() {
    if (this.UserAuthService.isLoggedIn()) {
      this.UserAuthService.refreshToken();
      return true;
    } else {
      this.UserAuthService.logout();
      document.getElementById('buyerLogin').style.display = 'block';
      return false;
    }
  }
}

@Injectable()
export class SellerAuthGuard implements CanActivate {
  constructor(
    private UserAuthService: UserAuthService,
    private router: Router,
    private subscription: SubscriptionService
  ) {}

  canActivate() {
    if (this.UserAuthService.sellerIsLoggedIn()) {
      this.UserAuthService.sellerRefreshToken();
      // this.subscription.subscriptionHistory().subscribe(item => {
      //   console.log(item);
      // })
      return true;
    } else {
      this.UserAuthService.sellerLogout();
      this.router.navigate(['/dashboard/login']);
      return false;
    }
  }
}

@Injectable()
export class IsSignedInGuard implements CanActivate {
  // here you can inject your auth service to check that user is signed in or not
  constructor(
    private UserAuthService: UserAuthService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.UserAuthService.sellerIsLoggedIn()) {
      this.router.navigate(['/dashboard']); // or home
      return false;
    }
    return true;
  }
}