import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { config } from 'src/config';
@Injectable({ providedIn: 'root' })
export class FileService {

  constructor(private http: HttpClient) {}

  downloadFile(url:string): any {
    return this.http.get("http://127.0.0.1:8000"+url, {responseType: 'blob'});
  }
   
}