import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class PrivacyPolicyService {

  constructor(private http: HttpClient) { }
  
  getPrivacyPolicyData(): Observable<any> {
    let privacy_policy = config.base_url+'api/website/privacy/policy'+'/';
    return this.http.get(privacy_policy); 
  }
}
