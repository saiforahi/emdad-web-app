import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  providedIn: 'root'
})
export class UserAuthService {

  private apiRoot = 'http://localhost:8000/auth/';

  // // http options used for making API calls
  // private httpOptions: any;
 
  // // the actual JWT token
  // public token: string;
 
  // // the token expiration date
  // public token_expires: Date;
 
  // // the username of the logged in user
  // public username: string;
 
  // // error messages received from the login attempt
  // public errors: any = [];

  constructor(private http: HttpClient) {
    // this.httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    // };
  }

  private setSession(authResult) {
    const token = authResult.token;
    const payload = <JWTPayload> jwt_decode(token);
    const expiresAt = moment.unix(payload.exp);
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(username: string, password: string) {
    return this.http.post(
      this.apiRoot.concat('login/'),
      { username, password }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  signup(username: string, email: string, password1: string, password2: string) {
    // to do sign up
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
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

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  // public login(user) {
  //   this.http.post('http://127.0.0.1:8000/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
  //     data => {
  //       this.updateData(data['token']);
  //     },
  //     err => {
  //       this.errors = err['error'];
  //     }
  //   );
  // }
 
  // Refreshes the JWT token, to extend the time the user is logged in
  // public refreshToken() {
  //   this.http.post('http://127.0.0.1:8000/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
  //     data => {
  //       this.updateData(data['token']);
  //     },
  //     err => {
  //       this.errors = err['error'];
  //     }
  //   );
  // }
 
  // public logout() {
  //   this.token = null;
  //   this.token_expires = null;
  //   this.username = null;
  // }
 
  // private updateData(token) {
  //   this.token = token;
  //   this.errors = [];
  //   // decode the token to read the username and expiration timestamp
  //   const token_parts = this.token.split(/\./);
  //   const token_decoded = JSON.parse(window.atob(token_parts[1]));
  //   console.log(token_decoded);
  //   this.token_expires = new Date(token_decoded.exp * 1000);
  //   this.username = token_decoded.username;
  // }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private UserAuthService: UserAuthService, private router: Router) { }

  canActivate() {
    if (this.UserAuthService.isLoggedIn()) {
      this.UserAuthService.refreshToken();

      return true;
    } else {
      this.UserAuthService.logout();
      this.router.navigate(['login']);

      return false;
    }
  }
}
