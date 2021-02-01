import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TicketService } from '../../shared/services/ticket.service';

@Component({
  selector: 'app-support-ticket-page',
  templateUrl: './support-ticket-page.component.html',
  styleUrls: ['./support-ticket-page.component.css'],
})
export class SupportTicketPageComponent implements OnInit {
  supportTicketData = [
    {
      ticketId: '123456',
      date: '12-03-2021',
      subject:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      details:
        "Details: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      status: 'Running',
    },
  ];
  selectedSupportTicket = undefined;
  toggleSort = true;
  status = ['Initiative', 'Undergoing', 'Resolved'];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    let uid = localStorage.getItem('uid');
    this.ticketService.getTickets(uid).subscribe((data) => {
      console.log(data);
      this.supportTicketData = data.data;
    });
  }

  hideModal() {
    document.getElementById('supportTicketModal').style.display = 'none';
  }
  showModal(id): void {
    document.getElementById('supportTicketModal').style.display = 'block';
    this.selectedSupportTicket = this.supportTicketData[id];
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
}
