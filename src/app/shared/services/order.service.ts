import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { config } from '../../../config';
import { Orders } from '../models/mocks/Orders';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  statusUpdated: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) {}

  putOrder(finalCart): Observable<any> {
    return this.http.post(
      config.base_url + 'api/order/add/',
      finalCart,
      this.httpOptions
    );
  }

  getSellerOrders(uId) {
    return this.http.get(
      config.base_url + 'api/order/list/' + uId + '/',
      this.httpOptions
    );
  }

  SingleOrderDetails(sellerId, orderId) {
    return this.http.get(
      config.base_url + 'api/order/details/' + sellerId + '/' + orderId + '/',
      this.httpOptions
    );
  }

  orderStatusUpdate(sellerId, orderData) {
    this.statusUpdated.next(true);
    return this.http.post(
      config.base_url + 'api/order/update/tracking/status/' + sellerId + '/',
      orderData,
      this.httpOptions
    );
  }

  get_order_list(): Observable<any> {
    //return of(Orders);
    return this.http.get(
      config.base_url + 'api/order/list/' + localStorage.getItem('uid') + '/',
      this.httpOptions
    );
  }

  get_buyer_order_list(): Observable<any> {
    return this.http.get(
      config.base_url +
        'api/buyer/order/list/' +
        localStorage.getItem('uid') +
        '/',
      this.httpOptions
    );
  }

  get_seller_order_list(): Observable<any> {
    return this.http.get(
      config.base_url +
        'api/order/list/' +
        localStorage.getItem('s_uid') +
        '/',
      this.httpOptions
    );
  }

  get_buyer_order_details(order_id: string): Observable<any> {
    return this.http.get(
      config.base_url + 'api/buyer/order/details/' + order_id + '/',
      this.httpOptions
    );
  }

  add_payment(data): Observable<any> {
    return this.http.post(
      config.base_url + 'api/order/payment/trans/',
      data,
      this.httpOptions
    );
  }

  verify_payment(data): Observable<any> {
    return this.http.post(
      config.base_url + 'api/order/payment/check/',
      data,
      this.httpOptions
    );
  }

  get_active_shipping_address_of_buyer(): Observable<any> {
    return this.http.get(
      config.base_url +
        'api/address/book/default/' +
        localStorage.getItem('uid') +
        '/',
      this.httpOptions
    );
  }
  submit_card_info(data: any): Observable<any> {
    return this.http.post(
      config.base_url + 'api/order/payment/trans/token/',
      data,
      this.httpOptions
    );
  }

  upload_invoice(order_id:any,data:any):Observable<any> {
    return this.http.post(config.base_url + 'api/order/wired/transfer/invoice/'+order_id+'/',data,this.httpOptions)
  }
}
