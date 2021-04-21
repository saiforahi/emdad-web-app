import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';
@Injectable({
  providedIn: 'root'
})
export class TermsConditionsService {

  constructor(private http: HttpClient) { }

  getTermsCondition(): Observable<any> {
    let terms_condition = config.base_url+'api/website/terms/conditions'+'/';
    return this.http.get(terms_condition);
  }
}
