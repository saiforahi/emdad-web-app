import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../../config';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchProducts: Observable<any>;

  constructor(private http: HttpClient) {}

  search(query): Observable<any> {
    return this.http.get(
      config.base_url + 'api/product/filter/list?search=' + query
    );
  }

  getNextBatchProduct(link): Observable<any> {
    return this.http.get(link);
  }

  filter_products(query): Observable<any> {
    return this.http.get(config.base_url + 'api/product/filter/list?' + query);
  }

  sellerwise_filter_products(query: string, sellerId: any): Observable<any> {
    return this.http.get(
      config.base_url +
        'api/product/seller/filter/list/' +
        sellerId +
        '/?' +
        query
    );
  }

  // getSearchProducts(): Observable<any>{
  //   return this.searchProducts;
  // }
}
