import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    notifications: BehaviorSubject<any> = new BehaviorSubject<Array<any>>(null);
    messages: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    unread: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    s_notifications: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
    s_messages: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    s_unread: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    httpOptions = {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        }),
    };
    sellerHttpOptions = {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('s_token'),
        }),
    };
    constructor(private http: HttpClient) {
        if(localStorage.getItem('uid')){
            this.getAllNotificationsForBuyer()
        }
        else if(localStorage.getItem('s_uid')){
            this.getAllNotificationsForSeller()
        }
    }

    getAllNotificationsForBuyer(){
        this.http.get(config.base_url+'api/notification/user/wise/list/'+localStorage.getItem('uid')+'/',this.httpOptions).subscribe(
            (success:any)=>{
                if (success.data[0].length>0) {
                    console.log('notifications',success.data[0])
                    this.notifications.next(success.data[0])
                    let unread=0
                    this.messages.next([])
                    let temp_messages=[]
                    success.data[0].forEach(element => {
                        temp_messages.push(element.notification)
                        if(element.status===false){
                            unread++
                        }
                    });
                    this.messages.next(temp_messages)
                    this.unread.next(unread);
                }
            }
        )
    }
    markAllNotificationSeller(){
        this.http.get(config.base_url+'api/notification/mark/as/read/'+localStorage.getItem('s_uid')+'/',this.sellerHttpOptions).subscribe(
            (success)=>{console.log('notification marking result',success)},
            (error)=> {console.log('notification marking result',error)}
        )
        this.s_unread.next(0)
    }
    markAllNotificationBuyer(){
        this.http.get(config.base_url+'api/notification/mark/as/read/'+localStorage.getItem('uid')+'/',this.httpOptions).subscribe(
            (success)=>{console.log('notification marking result',success)},
            (error)=> {console.log('notification marking result',error)}
        )
        this.unread.next(0)
    }
    getAllNotificationsForSeller(){
        this.http.get(config.base_url+'api/notification/user/wise/list/'+localStorage.getItem('s_uid')+'/',this.sellerHttpOptions).subscribe(
            (success:any)=>{
                if (success.data[0].length>0) {
                    console.log('notifications',success.data[0])
                    this.s_notifications.next(success.data[0])
                    let unread=0
                    this.s_messages.next([])
                    let temp_messages=[]
                    success.data[0].forEach(element => {
                        temp_messages.push(element.notification)
                        if(element.status===false){
                            unread++
                        }
                    });
                    this.s_messages.next(temp_messages)
                    this.s_unread.next(unread);
                }
            }
        )
    }
    refresh_buyer_notification_details(){
        this.getAllNotificationsForBuyer()
    }
    refresh_notification_details(){
        this.getAllNotificationsForSeller()
    }
    markNotificationAsBuyer(id:any):Observable<any>{
        return this.http.get(config.base_url+'api/notification/mark/as/read/'+id+'/',this.httpOptions)
    }
    markNotificationAsSeller(id:any):Observable<any>{
        return this.http.get(config.base_url+'api/notification/mark/as/read/'+id+'/',this.sellerHttpOptions)
    }
}
