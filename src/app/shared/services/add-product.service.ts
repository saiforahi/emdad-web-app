import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  private readonly URL = '//127.0.0.1:8000/api/product/add/';
  constructor(private http: HttpClient, private authService: UserAuthService) {}

  addProduct(productData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token'),
      }),
    };
    console.log(httpOptions);
    return this.http.post(this.URL, httpOptions, productData );
  }
}
