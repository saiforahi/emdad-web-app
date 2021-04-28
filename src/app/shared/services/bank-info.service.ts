import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../../../config';

@Injectable({
  providedIn: 'root',
})
export class BankInfoService {
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('s_token')
    }),
  };

  constructor(private http: HttpClient) {}

  getBankInfo(uId) {
    return this.http.get(
      config.base_url + 'api/seller/bank/account/info/' + uId + '/',
      this.httpOptions
    );
  }

  addBankInfo(data: any, uId){
    return this.http.post(
      config.base_url + 'api/seller/bank/info/update/' + uId + '/',
      data,
      this.httpOptions
    );
  }

  // http://127.0.0.1:8000/api/seller/bank/file/delete/51/
  fileDelete(uId){
    return this.http.get(
      config.base_url + 'api/seller/bank/file/delete/' + uId + '/',
      this.httpOptions
    );
  }
}
