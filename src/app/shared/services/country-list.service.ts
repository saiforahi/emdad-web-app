import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  countryUrl: string = config.base_url + 'api/country/list';
  cityUrl: string = '';

  constructor(private http: HttpClient) {}

  allCountries(): Observable<any> {
    return this.http.get(this.countryUrl);
  }

  allCities(id: number): Observable<any> {
    this.cityUrl = config.base_url + 'api/city/list/' + id + '/';
    return this.http.get(this.cityUrl);
  }

  getCountryOfCity(cityId): Observable<any> {
    this.cityUrl = config.base_url + 'api/city/details/' + cityId + '/';
    return this.http.get(this.cityUrl);
  }
}
