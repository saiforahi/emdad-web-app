import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {CommissionService} from '../app/shared/services/commission.services'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'emdad-web-app';

  constructor(private commission:CommissionService) {}

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
