import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../../config'
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchProducts: Observable<any>;

  constructor(private http: HttpClient) { }

  search(query): Observable<any> {
    return this.http.get(config.base_url + 'api/product/filter/list?search=' + query);
  }
  filter_products(query): Observable<any> {
    return this.http.get(config.base_url + 'api/product/filter/list?' + query)
  }
  // getSearchProducts(): Observable<any>{
  //   return this.searchProducts;
  // }
}
