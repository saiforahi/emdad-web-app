import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryModalComponent } from './order-history-modal/order-history-modal.component';
import {OrderService} from '../../../shared/services/order.service'
export interface Order {
  id: string;
  payment_date:string;
  delivery_date:string;
  status: number;
  amount: number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', status: 1 },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', status: 2 },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', status: 1 },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', status: 1 },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', status: 2 },
// ];

@Component({
  selector: 'app-seller-order-history-page',
  templateUrl: './seller-order-history-page.component.html',
  styleUrls: ['./seller-order-history-page.component.css'],
})
export class SellerOrderHistoryPageComponent implements OnInit {
  orders:Array<any>=[]
  filtered_orders:Array<any>=[]
  constructor(public dialog: MatDialog, private orderService:OrderService) {

  }

  ngOnInit(): void {
    console.log('hi')
    this.orderService.get_seller_order_list().subscribe(
      (success)=>{
        console.log('orders',success.data)
        success.data.forEach(element => {
          this.orders.push({})
        });
        this.orders=success.data
        this.filtered_orders=this.orders
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  displayedColumns: string[] = [
    'id',
    'payment_date',
    'delivery_date',
    'status',
    'amount',
    'view'
  ];
  //dataSource = ELEMENT_DATA;

  openDialog(order:any) {
    const dialogRef = this.dialog.open(OrderHistoryModalComponent, {
      autoFocus: false,
      data: {order:order},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  filter_data(orders:Array<any>){
    let temp:Array<any>=[]
    orders.forEach((order)=>{
      let completed:boolean=true
      order.order.tracking_order.forEach((item:any) => {
        if(item.status!=5){

        }
      });
    })
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
    this.filtered_orders=[]
    if(value==1){
      this.orders.forEach((order:any)=>{
        if(order.order.payment_type===1 && order.order.order_payment.length>0){
          console.log('type',order.order.payment_type)
          this.filtered_orders.push(order)
        }
      })
    }
    else if(value==0){
      this.orders.forEach((order:any)=>{
        if(order.order.payment_type===0){
          console.log('type',order.order.payment_type)
          this.filtered_orders.push(order)
        }
      })
    }
    else{
      this.filtered_orders=this.orders
    }
  }
  get_price(id:any){
    // this.orderService.get_seller_order_details(id).subscribe(
    //   (success)=>{
    //     return (parseFloat(success.data[0].unit_price)*parseFloat(success.data[0].quantity))+parseFloat(success.data[0].commission)+parseFloat(success.data[0].vat_amount)
    //   }
    // )
    //return (parseFloat(unit_price)*parseFloat(quantity))+parseFloat(commission)+parseFloat(vat_amount)
  }
  get_total(){
    let total:number=0
    this.orders.forEach((order:any)=>{
      total+= parseFloat(order.order.total_amount)
    })
    return total.toFixed(2)
  }
}
