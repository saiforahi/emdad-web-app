import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuotationService } from 'src/app/shared/services/quotation.service';
import { ViewDialogueComponent } from './view-dialogue/view-dialogue.component';
import { UserAuthService } from '../../../shared/services/user-auth.service';

/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
} */
/* const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
]; */

@Component({
  selector: 'app-manage-rfq',
  templateUrl: './manage-rfq.component.html',
  styleUrls: ['./manage-rfq.component.css']
})
export class ManageRfqComponent implements OnInit {
quotationList:any=[];

 userId:any;



  constructor(
    public dialog: MatDialog,
    private router: Router,
    private rfqService: QuotationService,
    private uAuth: UserAuthService,
  ) { }

  ngOnInit(): void {
    this.uAuth.uId.subscribe(item =>{
      this.userId = item;
    })  
    this.rfqService.getBuyerOrders(this.userId).subscribe(item => {
       console.log(item);
       this.quotationList = item;
       console.log(this.quotationList);
    });
    this.rfqService.statusUpdated.subscribe(item =>{
      if(item == true){
        this.ngOnInit();
        this.rfqService.statusUpdated.next(false);
      }
    })
  }
  displayedColumns: string[] = ['id', 'date', 'status', 'buyerName', 'edit'];
dataSource= this.quotationList.data ;
  openDialog() {
    const dialogRef = this.dialog.open(ViewDialogueComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
