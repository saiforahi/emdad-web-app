import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  productDetailsData: any = undefined;
  constructor(private http: HttpClient) {}

  product(): Observable<any> {
    return this.http.get(`http://182.160.97.250:8002/api/product/list/`);
  }

  // return only 12 items
  popularProduct(): Observable<any> {
    return this.http.get(`http://182.160.97.250:8002/api/product/list/`);
  }

  getNextBatchProduct(link): Observable<any> {
    return this.http.get(link);
  }

  productDetails(id): Observable<any> {
    this.productDetailsData = this.http.get(
      `http://182.160.97.250:8002/api/product/details/${id}/`
    );
    return this.productDetailsData;
  }

  getProductBySeller(id): Observable<any> {
    return this.http.get(
      `http://182.160.97.250:8002/api/product/seller/products/${id}/`
    );
  }

  productByCategory(id) {
    return this.http.get(
      `http://182.160.97.250:8002/api/product/details/${id}`
    );
  }

  getProductByCategory(id): Observable<any> {
    return this.http.get(
      `http://182.160.97.250:8002/api/product/category/products/${id}/`
    );
  }
}
