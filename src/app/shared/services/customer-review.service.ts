import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerReviewService {
  constructor(private http: HttpClient) {}

  getComments(prod_id) {
    return this.http.get(
      `http://182.160.97.250:8002/api/product/comment/list/${prod_id}/`
    );
  }

  addComments(comments: any) {
    return this.http.post(
      `http://182.160.97.250:8002/api/product/comment/add/`,
      comments
    );
  }
}
