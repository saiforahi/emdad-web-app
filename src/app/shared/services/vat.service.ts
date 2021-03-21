import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class VatService {
  constructor(private http: HttpClient) {}

  getVat(): Observable<any> {
    return this.http.get(config.base_url + 'api/vat/amount');
  }
}
