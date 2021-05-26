import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { config } from '../../../config';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
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
  statusUpdated: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) {}

  get_user_quotation_list(): Observable<any> {
    return this.http.get(
      config.base_url +
        'api/quote/user/wise/' +
        localStorage.getItem('uid') +
        '/',
      this.httpOptions
    );
  }

  get_seller_quotation_list(): Observable<any> {
    return this.http.get(
      config.base_url +
        'api/quote/user/wise/' +
        localStorage.getItem('s_uid') +
        '/',
      this.sellerHttpOptions
    );
  }

  get_seller_quotation_details(id): Observable<any> {
    return this.http.get(
      config.base_url + 'api/quote/details/' + id + '/',
      this.sellerHttpOptions
    );
  }

  get_quotation_details(id): Observable<any> {
    return this.http.get(
      config.base_url + 'api/quote/details/' + id + '/',
      this.httpOptions
    );
  }

  createQuotation(rfqData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      config.base_url + 'api/quote/create/',
      rfqData,
      httpOptions
    );
  }

  updateQuotation(id, formData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    // const updateURL = `http://127.0.0.1:8000/api/quote/update/${id}/`;
    return this.http.put(config.base_url+'api/quote/update/'+id+'/', formData, httpOptions).pipe(shareReplay());
  }

  updateQuotationSeller(id, formData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'multipart/form',
        Authorization: 'Bearer ' + localStorage.getItem('s_token'),
      }),
    };
    return this.http.put(config.base_url+'api/quote/update/'+id+'/', formData, httpOptions).pipe(shareReplay());
  }

  updateRfq(id:any,data:any): Observable<any> {
    return this.http.post(config.base_url + 'api/rfq/update/status/'+id+'/',data,this.httpOptions)
  }
  updateRfqSeller(id:any,data:any): Observable<any> {
    return this.http.post(config.base_url + 'api/rfq/update/status/'+id+'/',data,this.sellerHttpOptions)
  }

  updateQuotationStatus(id:any,data:any): Observable<any> {
    return this.http.post( config.base_url + 'api/quote/update/status/'+id+'/',data,this.httpOptions)
  }


}
