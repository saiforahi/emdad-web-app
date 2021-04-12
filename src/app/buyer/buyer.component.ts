import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { WebSocketBridge } from 'django-channels'
import { NotificationService } from '../shared/services/notification.service';
@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {
  webSocketBridge = new WebSocketBridge()
  constructor(private translate:TranslateService,public notificationService:NotificationService) {
    //translate.addLangs(['en', 'ar']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
    this.webSocketBridge.connect('ws://103.123.8.52:8002/ws/notifications');
    this.webSocketBridge.addEventListener("message", function(event) {
      console.log(event.data);
      notificationService.refresh_buyer_notification_details()
    });
  }

  ngOnInit(): void {
    this.notificationService.getAllNotificationsForBuyer()
  }

}
