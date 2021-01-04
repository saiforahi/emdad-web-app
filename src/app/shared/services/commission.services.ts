import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommissionService {
  constructor(private http: HttpClient) {}

  getCommission(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8002/api/vat/amount`);
  }
}
