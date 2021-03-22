import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private http: HttpClient) { }

  getAboutUsData(): Observable<any> {
    let about_us_data = config.base_url +'api/website/about/us'+'/';
    return this.http.get(about_us_data);
  }
}
