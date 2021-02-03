import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  statusUpdated: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(private http: HttpClient) {}
  get_user_quotation_list():Observable<any>{
      return this.http.get(config.base_url+"api/quote/user/wise/"+localStorage.getItem('uid')+"/",this.httpOptions)
  }
}
