import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderViewModalComponent } from './order-view-modal/order-view-modal.component';
import {OrderService} from '../../../shared/services/order.service'

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
  constructor(
    public dialog: MatDialog,
    private orderService:OrderService
    ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('s_token'))
    console.log(localStorage.getItem('s_uid'))
    this.orderService.get_seller_order_list().subscribe(
      (success)=>{
        console.log('response',success.data)
        let temp:Array<any>=[]
        success.data.forEach((element:any) => {
          if(element.status != 5){
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
      // console.log("****")
      // console.log("element status",element.status)
      // console.log("min",min_status)
      // console.log("****")
      if(element.order == order.order.id){
        //min_status=element.status
        temp.push(element)
      }
    });
    console.log("temp",temp)
    let min_status=temp[0].status
    temp.forEach((item)=>{
      if(item.status<min_status){
        min_status=item.status
      }
    })
    return min_status
  }

  
}
