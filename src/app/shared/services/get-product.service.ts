import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  productDetailsData: any = undefined;
  constructor(private http: HttpClient) {}

  product(): Observable<any> {
    return this.http.get(config.base_url+'api/product/list/');
  }

  // return only 12 items
  popularProduct(): Observable<any> {
    return this.http.get(config.base_url+'api/product/list/');
  }

  getNextBatchProduct(link): Observable<any> {
    return this.http.get(link);
  }

  productDetails(id:any): Observable<any> {
    this.productDetailsData = this.http.get(
      config.base_url+'api/product/details/'+id+'/'
    );
    return this.productDetailsData;
  }

  getProductBySeller(id): Observable<any> {
    return this.http.get(
      config.base_url+'api/product/seller/products/'+id+'/'
    );
  }

  // sller wise product list
  sellersProductByCategory(sellerId, catId){
    return this.http.get(config.base_url+'api/product/seller/category/products/'+sellerId+'/'+catId+'/');
  }

  productByCategory(id) {
    return this.http.get(config.base_url+'api/product/details/'+id+'/');
  }

  getProductByCategory(id): Observable<any> {
    return this.http.get(
      config.base_url+'api/product/category/products/'+id+'/'
    );
  }

  getBrands(): Observable<any>{
    return this.http.get(config.base_url+'api/brand/list')
  }
}
