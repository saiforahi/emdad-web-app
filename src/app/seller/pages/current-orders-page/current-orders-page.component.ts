import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderViewModalComponent } from './order-view-modal/order-view-modal.component';
import {OrderService} from '../../../shared/services/order.service'
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

export interface Order {
  code: string;
  payment_date:string;
  delivery_date:string;
  status: number;
  amount: number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 1},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 2},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 3},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 4},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 5},
// ];

@Component({
  selector: 'app-current-orders-page',
  templateUrl: './current-orders-page.component.html',
  styleUrls: ['./current-orders-page.component.css']
})
export class CurrentOrdersPageComponent implements OnInit {
  orders:Array<any>=[]
  selectedOrder:any
  challan = new FormData();
  toggleSort:boolean = true;
  lowValue: number = 0;
  highValue: number = 5;

  constructor(
    public dialog: MatDialog,
    private orderService:OrderService,
    private router: Router,
    private authService: UserAuthService,
    private subscription: SubscriptionService
  ) {
    this.authService.sellerIsApproved(localStorage.getItem("s_uid")).subscribe((item: any) => {
      console.log(item)
      // Approved User, User Not Approve
      this.subscription.isSubscribed().subscribe((item2: any) => {
        console.log(item2)
        // User Not Subscribe, Subscribe User
        if (item.message != 'Approved User' && item2.message != 'Subscribe User') {
          console.log("condition 1")
          this.router.navigate(['/dashboard/welcome']);
        } else if (item.message == 'Approved User' && item2.message != 'Subscribe User') {
          console.log("condition 2")
          this.router.navigate(['/dashboard/subscription-plan']);
        }
      })
    })
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('s_token'))
    console.log(localStorage.getItem('s_uid'))
    this.orderService.get_seller_order_list().subscribe(
      (success)=>{
        console.log('response',success.data)
        let temp:Array<any>=[]
        success.data.forEach((element:any) => {
          if(this.decide_status(element) != 5){
            temp.push(element)
          }
        });
        this.orders=temp
        console.log('orders',this.orders)
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  displayedColumns: string[] = [
    'code',
    'payment_date',
    'delivery_date',
    'status',
    'amount',
    'view'
  ];
  // dataSource = ELEMENT_DATA;

  openDialog(order:any) {
    const dialogRef = this.dialog.open(OrderViewModalComponent, {
      autoFocus: false,
      data: {order:order}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.selectedOrder=result
      console.log(`Dialog result: ${this.selectedOrder}`);
    });
  }
  //date format helper
  formatDate(date:string){
    if(date!=null){
      return new Date(date).toDateString()
    }
    return '-'
  }

  //filtering orders
  filter_orders(value:any){
    let temp:Array<any>=[]
    this.orders.forEach((order:any)=>{
      console.log(order)
    })
  }

  decide_status(order:any){
    let temp=[]
    order.order.tracking_order.forEach(element => {
      if(element.order == order.order.id){
        temp.push(element)
      }
    });
    let min_status=temp[0].status
    temp.forEach((item)=>{
      if(item.status<min_status && item.seller == localStorage.getItem('s_uid')){
        min_status=item.status
      }
    })
    return min_status
  }

  sortTable() {
    if (this.toggleSort) {
      this.orders.sort((a, b) => new Date(b.order.order_datetime).getTime() - new Date(a.order.order_datetime).getTime());
      this.toggleSort = !this.toggleSort;
      return this.orders;
    } else {
      this.orders.sort((b, a) => new Date(b.order.order_datetime).getTime() - new Date(a.order.order_datetime).getTime());
      this.toggleSort = !this.toggleSort;
      return this.orders;
    }
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  
}
