import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

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
      `http://182.160.97.250:8002/api/product/wishlist/add/`,
      { product: product_id, buyer: this.uid, status: 1 },
      httpOptions
    );
  }

  getWishlist(): Observable<any> {
    return this.http.get(
      `http://182.160.97.250:8002/api/product/wishlist/list/${this.uid}/`
    );
  }
}
