import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { config } from 'src/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(private http: HttpClient, private authService: UserAuthService) {}

  addProduct(productData: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(
      config.base_url + 'api/product/add/',
      productData,
      httpOptions
    );
  }

  getUnitOfProduct(): Observable<any> {
    return this.http.get(config.base_url + 'api/unit/list');
  }

  getBrandList(): Observable<any> {
    return this.http.get(config.base_url + 'api/brand/list');
  }

  updateProduct(productData: any, id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.put(
      config.base_url + 'api/product/update/' + id + '/',
      productData,
      httpOptions
    );
  }

  deleteProduct(id) {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(
      config.base_url + 'api/product/delete/' + id + '/',
      httpOptions
    );
  }

  deleteProdImage(prod_id, imageColumn){
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(
      config.base_url + 'api/product/image/delete/' + prod_id + '/' + imageColumn + '/',
      httpOptions
    );
  }

  deleteProdAttachment(attachment_id){
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(
      config.base_url + 'api/product/file/delete/' + attachment_id + '/',
      httpOptions
    );
  }

  uploadXl(data) {
    let uploadURL = `${config.base_url}api/product/bulk/add/`;
    return this.http
      .post<any>(uploadURL, data, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }

  uploadDirectory(data){
    let uploadURL = `${config.base_url}api/product/bulk/image/add/`;
    return this.http
      .post<any>(uploadURL, data, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }
}
