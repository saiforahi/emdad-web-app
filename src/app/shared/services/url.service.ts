import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
    // public previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    // public previousUrl$: Observable<string> = this.previousUrl.asObservable();
    private previousUrl: string;
    private currentUrl: string;
    constructor(private router:Router) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {        
            this.previousUrl = this.currentUrl;
            this.currentUrl = event.url;
        };
        });
    }
    public getPreviousUrl() {
        return this.previousUrl;
      }  
      public getCurrentUrl() {
        return this.previousUrl;
      }  

    // setPreviousUrl(previousUrl: string) {
    //     this.previousUrl.next(previousUrl);
    // }
}
