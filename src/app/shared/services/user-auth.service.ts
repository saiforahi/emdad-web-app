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
  private apiRoot = 'http://localhost:8000/auth/';
  uName: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  uId: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.uName.next(localStorage.getItem('username'));
    this.uId.next(localStorage.getItem('uid'));
  }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload>jwt_decode(token);
    console.log(payload);
    const expiresAt = moment.unix(payload.exp);
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('username', payload.username);
    localStorage.setItem('uid', JSON.stringify(payload.user_id));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.uName.next(localStorage.getItem('username'));
    this.uId.next(localStorage.getItem('uid'));
    // return payload.group
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(email: string, password: string, group: String): Observable<any> {
    return this.http
      .post('http://localhost:8000/api/login/', { email, password, group })
      .pipe(
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

  sellerSignup(
    full_name,
    email,
    phone,
    password,
    gender,
    adrress,
    store_address,
    store_name,
    zip_code
  ): Observable<any> {
    return this.http
      .post('http://127.0.0.1:8000/api/buyer/registration/', {
        full_name,
        email,
        phone,
        password,
        gender,
        adrress,
        store_address,
        store_name,
        zip_code,
      })
      .pipe(shareReplay());
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('uid');
    this.uName.next(null);
    this.uId.next(null);
    this.router.navigate(['/login']);
  }

  refreshToken() {
    if (
      moment().isBetween(
        this.getExpiration().subtract(2, 'days'),
        this.getExpiration()
      )
    ) {
      return this.http
        .post(this.apiRoot.concat('refresh-token/'), { token: this.token })
        .pipe(
          tap((response) => this.setSession(response)),
          shareReplay()
        )
        .subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
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
    // if (user.user_type === 'BUYER') {
      var updateURL = `http://127.0.0.1:8000/api/buyer/profile/update/${userId}/`;
    // } else {
    //   const updateURL = `http://127.0.0.1:8000/api/seller/profile/update/${userId}/`;
    // }
    return this.http
      .post(updateURL,
        user,
        httpOptions
      )
      .pipe(shareReplay());
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
      this.router.navigate(['/login']);

      return false;
    }
  }
}
