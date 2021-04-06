import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {CommissionService} from '../app/shared/services/commission.services'
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'emdad-web-app';

  constructor(private commission:CommissionService,private translate:TranslateService) {
    translate.addLangs(['en', 'ar']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
  }

  ngOnInit(): void {
    this.commission.getCommission().subscribe(
        (item) => {
          console.log('commision',item.data[0].percentage.toString())
          localStorage.setItem('commission',item.data[0].percentage.toString())
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
