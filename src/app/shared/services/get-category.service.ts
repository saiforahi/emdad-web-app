import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetCategoryService {
  private readonly URL = 'http://182.160.97.250:8002/category/';

  constructor(private http: HttpClient) {}

  category(): Observable<any> {
    return this.http.get(this.URL);
  }
}
