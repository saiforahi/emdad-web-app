import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {config} from '../../../config';
import {Orders} from '../models/mocks/Orders';
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  sellerHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('s_token'),
    }),
  };
  statusUpdated: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(private http: HttpClient) {}
  putOrder(finalCart): Observable<any>{
    return this.http.post(config.base_url+'api/order/add/', finalCart, this.httpOptions)
  }

  getSellerOrders(uId){
    return this.http.get(config.base_url+'api/order/list/'+uId+'/', this.httpOptions)
  }

  // getOrderstatus(order, seller){
  //   return this.http.post(`http://127.0.0.1:8000/api/order/track/info/`, {order, seller}, this.httpOptions)
  // }

  SingleOrderDetails(sellerId, orderId){
    return this.http.get(config.base_url+'api/order/details/'+sellerId+'/'+orderId+'/', this.httpOptions);
  }

  orderStatusUpdate(sellerId, orderData){
    this.statusUpdated.next(true);
    return this.http.post(config.base_url+'api/order/update/tracking/status/'+sellerId+'/', orderData, this.httpOptions);
  }

  get_order_list():Observable<any> {
     //return of(Orders);
    return this.http.get(config.base_url+"api/order/list/"+localStorage.getItem('uid')+'/',this.httpOptions);
  }

  get_buyer_order_list():Observable<any>{
    return this.http.get(config.base_url+"api/buyer/order/list/"+localStorage.getItem('uid')+"/",this.httpOptions)
  }

  get_buyer_order_details(order_id:string):Observable<any>{
    return this.http.get(config.base_url+"api/buyer/order/details/"+order_id+"/",this.httpOptions)
  }

  add_payment(data):Observable<any>{
    return this.http.post(config.base_url+"api/order/payment/trans/",data,this.httpOptions)
  }

  verify_payment(data):Observable<any>{
    return this.http.post(config.base_url+"api/order/payment/check/",data,this.httpOptions)
  }

  get_active_shipping_address_of_buyer():Observable<any>{
    return this.http.get(config.base_url+"api/address/book/default/"+localStorage.getItem('uid')+"/",this.httpOptions)
  }
  add_address(new_address):Observable<any>{
    return this.http.post(config.base_url+'api/address/book/add/',new_address,this.httpOptions)
  }
  get_addresses():Observable<any>{
    return this.http.get(config.base_url+'api/address/book/list/'+localStorage.getItem('uid')+'/',this.httpOptions)
  }

  get_pickup_address_details(id:any):Observable<any>{
    return this.http.get(config.base_url+'api/pickup/'+id+'/',this.sellerHttpOptions)
  }
}
