import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  plans(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/subscription/plans/`);
  }

  subscribeToPlan(
    fees,
    payment_type,
    payment_status,
    discount_amount,
    vat_amount,
    seller,
    subscription_plan,
    discount_coupon,
    created_by
  ): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/subscribe/`, {
      fees,
      payment_type,
      payment_status,
      discount_amount,
      vat_amount,
      seller,
      subscription_plan,
      discount_coupon,
      created_by,
    });
  }

  subscriptionHistory(): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:8000/api/subscription/history/${localStorage.getItem('s_uid')}/`
    );
  }
}
