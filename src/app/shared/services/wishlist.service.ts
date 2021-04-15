import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  uid;

  constructor(private user: UserAuthService, private http: HttpClient) {
    this.user.uId.subscribe((item) => {
      this.uid = item;
    });
  }

  addTowishlist(product_id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      config.base_url + 'api/product/wishlist/add/',
      { product: product_id, buyer: this.uid, status: 1 },
      httpOptions
    );
  }

  removeFromWishllist(product_id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(
      config.base_url + 'api/product/wishlist/remove/' + product_id + '/',
      httpOptions
    );
  }

  wishlistStatusCheck(product_id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
      return this.http.get(
        config.base_url +
          'api/product/wishlist/status/check/' +
          product_id +
          '/',
        httpOptions
      );
  }

  getWishlist(): Observable<any> {
    return this.http.get(
      config.base_url + 'api/product/wishlist/list/' + this.uid + '/'
    );
  }
}
