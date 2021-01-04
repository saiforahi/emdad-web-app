import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VatService {
  constructor(private http: HttpClient) {}

  getVat(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/vat/amount`);
  }
}
