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

  category(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.authService.token
      })
    };
    return this.http.get(this.URL);
  }
}
