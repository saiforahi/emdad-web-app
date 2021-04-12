import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceViewModalComponent } from './invoice-view-modal/invoice-view-modal.component';
import { OrderService } from '../../../shared/services/order.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-seller-invoices-page',
  templateUrl: './seller-invoices-page.component.html',
  styleUrls: ['./seller-invoices-page.component.css'],
})
export class SellerInvoicesPageComponent implements OnInit {
  invoices: Array<any> = [];
  lowValue: number = 0;
  highValue: number = 5;
  toggleSort = true;
  
  constructor(
    public dialog: MatDialog,
    private orderService: OrderService,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService
  ) {
    
    this.authService.s_uId.subscribe((s_uid) => {
      console.log(s_uid);
      if (s_uid != null) {
        this.authService.sellerIsApproved(s_uid).subscribe((item: any) => {
          console.log(item);
          // Approved User, User Not Approve
          this.subscription.isSubscribed().subscribe((item2: any) => {
            console.log(item2);
            // User Not Subscribe, Subscribe User
            if (
              item.message != 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              this.router.navigate(['/dashboard/welcome']);
            } else if (
              item.message == 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              swal(
                'Access Denied!',
                'you are not subscribed to any plan! Please subscribe.',
                'error'
              );
              this.router.navigate(['/dashboard/subscription-plan']);
            }
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.orderService.get_invoices_for_seller().subscribe(
      (success) => {
        this.invoices = success.data;
        console.log(success.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog(invoice: any) {
    const dialogRef = this.dialog.open(InvoiceViewModalComponent, {
      autoFocus: false,
      data: { invoice: invoice },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  formatDate(date: string): string {
    return new Date(date).toDateString();
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  sortTable() {
    if (this.toggleSort) {
      this.invoices.sort(
        (a, b) =>
          new Date(b.payment_date).getTime() -
          new Date(a.payment_date).getTime()
      );
      this.toggleSort = !this.toggleSort;
      return this.invoices;
    } else {
      this.invoices.sort(
        (b, a) =>
          new Date(b.payment_date).getTime() -
          new Date(a.payment_date).getTime()
      );
      this.toggleSort = !this.toggleSort;
      return this.invoices;
    }
  }
}
