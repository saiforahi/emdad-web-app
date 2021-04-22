import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class CustomerReviewService {
  constructor(private http: HttpClient) {}

  getComments(prod_id) {
    return this.http.get(
      config.base_url + 'api/product/comment/list/' + prod_id + '/'
    );
  }

  getNextComments(link): Observable<any> {
    return this.http.get(link);
  }

  getAllComments(prod_id): Observable<any> {
    return this.http.get(
      config.base_url + 'api/product/comment/total/'+ prod_id +'/'
    );
  }

  addComments(comments: any) {
    return this.http.post(
      config.base_url + 'api/product/comment/add/',
      comments
    );
  }
}
