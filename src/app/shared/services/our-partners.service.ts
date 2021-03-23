import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';
@Injectable({
  providedIn: 'root'
})
export class OurPartnersService {

  constructor(private http: HttpClient) { }
  getOurPartnersData(): Observable<any>{
    let ourPartners = config.base_url +'api/website/our/partner'+'/';
    return this.http.get(ourPartners);
  }
}
