import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class GetCategoryService {
  private readonly URL = config.base_url+'category/';

  constructor(
    private http: HttpClient
  ) { }

  category(): Observable<any> {
    return this.http.get(config.base_url+'category/');
  }

  PopularCategory(): Observable<any> {
    return this.http.get(config.base_url+'api/product/popular/category/');
  }

  categoriesOfSeller(uid): Observable<any> {
    return this.http.get(config.base_url+'api/seller/category/store/info/'+uid+'/');
  }
}
