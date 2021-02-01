import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly URL = 'http://127.0.0.1:8000/api/issue/add/';
  constructor(private http: HttpClient) {}

  openTicket(ticketForm: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(this.URL, ticketForm, httpOptions);
  }
}
