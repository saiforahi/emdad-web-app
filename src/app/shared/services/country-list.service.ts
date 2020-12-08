import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CountryListService {
	countryUrl: string = 'http://localhost:8000/api/country/list';
	cityUrl: string = '';

	constructor(private http: HttpClient) {}

	allCountries(): Observable<any> {
		return this.http.get(this.countryUrl);
	}

	allCities(id: number): Observable<any> {
		this.cityUrl = `http://localhost:8000/api/city/list/${id}`;
		return this.http.get(this.cityUrl);
	}
}
