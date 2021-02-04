import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerReviewService {

  constructor(private http: HttpClient) { }

  getComments(prod_id){
    return this.http.get(`http://127.0.0.1:8000/api/product/comment/list/${prod_id}/`)
  }

  addComments(comments: any){
    return this.http.post(`http://127.0.0.1:8000/api/product/comment/add/`, comments)
  }
}
