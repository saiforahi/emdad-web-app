import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from 'src/app/shared/services/file.service';
import { config } from 'src/config';
import {OrderService} from '../../../../shared/services/order.service'
import * as fileSaver from 'file-saver';
import { AddressService } from 'src/app/shared/services/address.service';
@Component({
  selector: 'app-order-history-modal',
  templateUrl: './order-history-modal.component.html',
  styleUrls: ['./order-history-modal.component.css']
})
export class OrderHistoryModalComponent implements OnInit {
  details:any
  img_base_url:string=config.img_base_url
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private addressService:AddressService, private orderService:OrderService,private fileService:FileService) { }

  ngOnInit(): void {
    //console.log('details',this.data.order)
    this.orderService.get_seller_order_details(this.data.order.order.id).subscribe(
      (success)=> {
        this.details=success.data;
        console.log('details',this.data.order.order)
        this.details.forEach((element:any) => {
          this.addressService.get_pickup_address_details(element.pickup_address).subscribe(
            (success)=>{
              console.log(success.data[0])
              if(success.data.length>0){
                element.pickup_address=success.data[0]
              } 
            }
          )
        });
        //this.get_pickup_address(this.details[0].pickup_address)
      }
    )
  }

  get_price(unit_price:string,quantity:string,commission:string,vat_amount:string){
    return (parseFloat(unit_price)*parseFloat(quantity)).toFixed(2)
  }

  formatDate(date:string){
    if(date!=null){
      return new Date(date).toDateString()
    }
    return '-'
  }

  download(index: string) {
    if(this.details[0].order.tracking_order[index].delivery_challan!=undefined){
      this.fileService.downloadFile(this.details[0].order.tracking_order[index].delivery_challan).subscribe((response) => {
        // console.log(response);
        let blob: any = new Blob([response], {
          type: 'text/plain;charset=utf-8',
        });
        const url = window.URL.createObjectURL(blob);
        //window.open(url);
        //window.location.href = response.url;
        fileSaver.saveAs(blob, 'proof.jpg');
      }),
        (error) => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
      }
    }

    get_pickup_address(id:any){
      this.addressService.get_pickup_address_details(id).subscribe(
        (success)=>{
          console.log(success.data[0])
          if(success.data.length>0){
            return success.data[0]
          } 
        }
      )
    }
    
}
