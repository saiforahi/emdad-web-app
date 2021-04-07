import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService
  ) {
    this.authService
      .sellerIsApproved(localStorage.getItem('s_uid'))
      .subscribe((item: any) => {
        console.log(item);
        // Approved User, User Not Approve
        this.subscription.isSubscribed().subscribe((item2: any) => {
          console.log(item2);
          // User Not Subscribe, Subscribe User
          if (
            item.message != 'Approved User' &&
            item2.message != 'Subscribe User'
          ) {
            console.log('condition 1');
            this.router.navigate(['/dashboard/welcome']);
          } else if (
            item.message == 'Approved User' &&
            item2.message != 'Subscribe User'
          ) {
            console.log('condition 2');
            this.router.navigate(['/dashboard/subscription-plan']);
          }
        });
      });
  }

  ngOnInit(): void {}
}
