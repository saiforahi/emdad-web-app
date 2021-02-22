import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private apiRoot = 'http://127.0.0.1:8000/auth/';
  uName: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  uId: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // uGroup: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  s_uName: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  s_uId: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  emailVerificationStatus: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private http: HttpClient, private router: Router) {
    this.uName.next(localStorage.getItem('username'));
    this.uId.next(localStorage.getItem('uid'));
    // this.uGroup.next(localStorage.getItem('group'));
  }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload>jwt_decode(token);
    // console.log(payload);
    if (authResult.group == 'buyer') {
      const expiresAt = moment.unix(payload.exp);
      localStorage.setItem('token', authResult.token);
      localStorage.setItem('username', payload.username);
      localStorage.setItem('uid', JSON.stringify(payload.user_id));
      // localStorage.setItem('group', authResult.group);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      this.uName.next(localStorage.getItem('username'));
      this.uId.next(localStorage.getItem('uid'));
      // this.uGroup.next(localStorage.getItem('group'));
    }
    if (authResult.group == 'seller') {
      const expiresAt = moment.unix(payload.exp);
      localStorage.setItem('s_token', authResult.token);
      // localStorage.setItem('group', authResult.group);
      localStorage.setItem('s_username', payload.username);
      localStorage.setItem('s_uid', JSON.stringify(payload.user_id));
      localStorage.setItem('s_expires_at', JSON.stringify(expiresAt.valueOf()));
      this.uName.next(localStorage.getItem('s_username'));
      // this.uGroup.next(localStorage.getItem('group'));
      this.uId.next(localStorage.getItem('uid'));
    }
  }

  // get token(): string {
  //   return localStorage.getItem('token');
  // }

  login(email: string, password: string, group: String): Observable<any> {
    var data = { email: email, password: password, group: group };
    return this.http.post(config.base_url + 'api/login/', data).pipe(
      tap((response) => {
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
      'http://127.0.0.1:8000/api/profile/details/' + id + '/',
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
      'http://127.0.0.1:8000/api/profile/details/' + id + '/',
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
      .post('http://127.0.0.1:8000/api/buyer/registration/', {
        full_name,
        email,
        phone,
        password,
      })
      .pipe(shareReplay());
  }

  sellerSignup(data): Observable<any> {
    return this.http
      .post('http://127.0.0.1:8000/api/seller/registration/', data)
      .pipe(shareReplay());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('uid');
    // localStorage.removeItem('uGroup');
    localStorage.removeItem('expires_at');
    this.uName.next(null);
    this.uId.next(null);
    // this.uGroup.next(null);
    localStorage.clear();
    this.router.navigate(['/']);
  }

  sellerLogout() {
    localStorage.removeItem('s_token');
    localStorage.removeItem('s_username');
    localStorage.removeItem('s_uid');
    // localStorage.removeItem('uGroup');
    localStorage.removeItem('s_expires_at');
    this.s_uName.next(null);
    this.s_uId.next(null);
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
        .post(this.apiRoot.concat('refresh-token/'), {
          token: localStorage.getItem('token'),
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
      'http://127.0.0.1:8000/api/change/password/',
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
      'http://127.0.0.1:8000/api/change/password/',
      { old_password, new_password },
      httpOptions
    );
  }

  forgotPassword(email): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/password_reset/', {
      email,
    });
  }

  resetPassword(token, password): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/password_reset/confirm/', {
      token,
      password,
    });
  }

  updateProfile(userId: number, user: any) {
    console.log(user);
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    if (user.user_type === 'buyer') {
      var updateURL = `http://127.0.0.1:8000/api/buyer/profile/update/${userId}/`;
    } else if (user.user_type === 'seller') {
      const updateURL = `http://127.0.0.1:8000/api/seller/profile/update/${userId}/`;
    }
    return this.http.post(updateURL, user, httpOptions).pipe(shareReplay());
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
    private router: Router
  ) {}

  canActivate() {
    if (this.UserAuthService.sellerIsLoggedIn()) {
      this.UserAuthService.sellerRefreshToken();
      return true;
    } else {
      this.UserAuthService.sellerLogout();
      this.router.navigate(['/dashboard/login']);
      return false;
    }
  }
}
