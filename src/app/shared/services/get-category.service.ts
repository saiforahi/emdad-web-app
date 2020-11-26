import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryService {

  private readonly URL = 'http://127.0.0.1:8000/category/';

  constructor(private http: HttpClient, private authService: UserAuthService) { }

  // create a method named: category()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  category(): Observable<any> {
    // console.log('Request is sent!');
    // this.http is a HttpClient library provide by @angular/common
    // we are calling .get() method over this.http object
    // this .get() method takes URL to call API
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.authService.token
      })
    };
    return this.http.get(this.URL);
  }
}
