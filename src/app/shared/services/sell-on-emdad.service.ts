import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';
@Injectable({
  providedIn: 'root'
})
export class SellOnEmdadService {

  constructor(private http: HttpClient) { }
  getSellingData(): Observable<any>{
    let sellHere = config.base_url +'api/website/sale/on/emdad'+'/';
    return this.http.get(sellHere);
  }
}
