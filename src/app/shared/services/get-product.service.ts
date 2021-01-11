import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  constructor(private http: HttpClient) {}

  product(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/product/list/`);
  }

  // return only 12 items 
  popularProduct(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/product/list/`);
  }

  getNextBatchProduct(link): Observable<any> {
    return this.http.get(link);
  }

  productDetails(id): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/product/details/${id}`);
  }

  getProductBySeller(id): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:8000/api/product/seller/products/${id}/`
    );
  }

  productByCategory(id) {
    return this.http.get(`http://127.0.0.1:8000/api/product/details/${id}`);
  }

  getProductByCategory(id): Observable<any> {
    return this.http.get(
      `http://127.0.0.1:8000/api/product/category/products/${id}/`
    );
  }
}
