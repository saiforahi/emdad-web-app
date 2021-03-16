import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private readonly URL_issue_add = config.base_url+'api/issue/add/'

  constructor(private http: HttpClient) {}

  openTicket(ticketForm: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post(this.URL_issue_add, ticketForm, httpOptions);
  }

  getTickets(uid): Observable<any> {
    // let uid = localStorage.getItem('uid');
    let URL_issue_list = config.base_url+'api/issue/list/'+uid+'/';
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.get(URL_issue_list, httpOptions);
  }
}
