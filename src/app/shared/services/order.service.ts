import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  statusUpdated: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) {}

  putOrder(finalCart): Observable<any>{
    return this.http.post(`http://127.0.0.1:8002/api/order/add/`, finalCart, this.httpOptions)
  }

  getSellerOrders(uId){
    return this.http.get(`http://127.0.0.1:8002/api/order/list/${uId}`, this.httpOptions)
  }

  // getOrderstatus(order, seller){
  //   return this.http.post(`http://127.0.0.1:8002/api/order/track/info/`, {order, seller}, this.httpOptions)
  // }

  SingleOrderDetails(sellerId, orderId){
    return this.http.get(`http://127.0.0.1:8002/api/order/details/${sellerId}/${orderId}`, this.httpOptions);
  }

  orderStatusUpdate(sellerId, orderData){
    this.statusUpdated.next(true);
    return this.http.post(`http://127.0.0.1:8002/api/order/update/tracking/status/${sellerId}/`, orderData, this.httpOptions);
  }

}
