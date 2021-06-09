import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../../../shared/services/file.service';
import * as fileSaver from 'file-saver';
import { TicketService } from '../../../shared/services/ticket.service';
import{PageEvent} from '@angular/material/paginator';
import { MatDialog} from '@angular/material/dialog';
import{ViewTicketDetailsComponent} from './view-ticket-details/view-ticket-details.component';
@Component({
  selector: 'app-support-ticket-page',
  templateUrl: './support-ticket-page.component.html',
  styleUrls: ['./support-ticket-page.component.css'],
})
export class SupportTicketPageComponent implements OnInit {
  supportTicketData = [];
  // providing a default dummy data to prevent error
  selectedSupportTicket = {
    image: '',
    issue_code: '123456',
    issue_date: '12-03-2021',
    title:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
    description:
      "Details: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    status: 2,
  };
  toggleSort = true;
  //pagination stuff
  lowValue: number = 0;
  highValue: number = 5;
  filtered_data: any;
  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
  status = ['Initiative', 'Undergoing', 'Resolved'];
  displayedColumns: string[] = ['id', 'subject', 'status','view'];

  constructor(
    private ticketService: TicketService,
    private fileService: FileService,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    let uid = localStorage.getItem('uid');
    this.ticketService.getTickets(uid).subscribe((data) => {
      //console.log(data.data[0].image.split('/')[]);
      this.supportTicketData = data.data;
      this.filtered_data=data.data;
      console.log("data",this.supportTicketData);
    });
  }
  //OPEN THE DIALOG FOR VIEWING ticket DETAILS
  openDialog(item) {
   this.dialog.open(ViewTicketDetailsComponent,{
    
        data:{
        supportData:item,
      }
    });
    
  }

  sortTable(): void {
    if (this.toggleSort) {
      this.supportTicketData.sort((a, b) => (a.status > b.status ? 1 : -1));
      this.toggleSort = !this.toggleSort;
    } else {
      this.supportTicketData.sort((a, b) => (a.status < b.status ? 1 : -1));
      this.toggleSort = !this.toggleSort;
    }
  }

  get_image_name(image_url: string) {
    let param_array = image_url.split('/');
    return param_array[param_array.length - 1];
  }
  formatDate(d: string): string {
    return new Date(d).toDateString();
  }
  filter_tickets(status:number){
    this.supportTicketData=[];
    this.filtered_data.forEach(element =>{
      if(element.status == status){
        this.supportTicketData.push(element);
      }
    })
  }
}
