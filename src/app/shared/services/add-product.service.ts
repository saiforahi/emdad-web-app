import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(private http: HttpClient, private authService: UserAuthService) {}

  addProduct(productData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        // 'Content-Type': 'multipart/form-data'
      }),
    };
    return this.http.post(config.base_url+'api/product/add/', productData, httpOptions );
  }

  getUnitOfProduct(): Observable<any>{
    return this.http.get(config.base_url+'api/unit/list');
  }

  getBrandList(): Observable<any>{
    return this.http.get(config.base_url+'api/brand/list');
  }
}
