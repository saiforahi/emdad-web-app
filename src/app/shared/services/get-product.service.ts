import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  private readonly URL = 'http://127.0.0.1:8000/api/product/list/';

  constructor(
    private http: HttpClient
  ) { }

  product(): Observable<any> {
    return this.http.get(this.URL);
  }
}
