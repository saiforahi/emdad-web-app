import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  selectedPlan;
  couponApplied;
  userId: any;

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  sellerHttpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('s_token'),
    }),
  };

  plans(): Observable<any> {
    return this.http.get(config.base_url + 'api/subscription/plans/');
  }

  subscribeToPlan(
    fees,
    payment_type,
    payment_status,
    total_paid_amount,
    discount_amount,
    seller,
    subscription_plan,
    discount_coupon,
    created_by
  ): Observable<any> {
    return this.http.post(config.base_url + 'api/subscribe/', {
      fees,
      payment_type,
      payment_status,
      total_paid_amount,
      discount_amount,
      seller,
      subscription_plan,
      discount_coupon,
      created_by,
    });
  }

  subscriptionHistory(): Observable<any> {
    return this.http.get(
      config.base_url +
        'api/subscription/history/' +
        localStorage.getItem('s_uid') +
        '/',
      this.sellerHttpOptions
    );
  }

  isSubscribed() {
    return this.http.get(
      config.base_url +
        'api/user/subscribe/check/' +
        localStorage.getItem('s_uid') +
        '/'
    );
  }
}
