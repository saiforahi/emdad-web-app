import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class CommissionService {
  constructor(private http: HttpClient) {}

  getCommission(): Observable<any> {
    return this.http.get(config.base_url + 'api/commission/amount');
  }
}
