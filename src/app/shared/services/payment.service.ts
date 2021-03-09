import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {config} from '../../../config';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  statusUpdated: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(private http: HttpClient) {}
  add_payment(data):Observable<any>{
    return this.http.post(config.base_url+"api/order/payment/trans/",data,this.httpOptions)
  }

  verify_payment(data):Observable<any>{
    return this.http.post(config.base_url+"api/order/payment/check/",data,this.httpOptions)
  }

  
  
}
