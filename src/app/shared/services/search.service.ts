import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchProducts: Observable<any>;

  constructor(private http: HttpClient) { }

  search(query): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/product/filter/list?search=` + query);
  }

  // getSearchProducts(): Observable<any>{
  //   return this.searchProducts;
  // }
}
