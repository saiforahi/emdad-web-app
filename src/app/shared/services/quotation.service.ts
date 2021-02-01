import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly URL = 'http://127.0.0.1:8000/api/quote/create/';
  constructor(private http: HttpClient) {}

  createQuotation(rfqData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(this.URL, rfqData, httpOptions);
  }
}
