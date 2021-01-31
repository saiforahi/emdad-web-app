import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-ticket-page',
  templateUrl: './support-ticket-page.component.html',
  styleUrls: ['./support-ticket-page.component.css'],
})
export class SupportTicketPageComponent implements OnInit {
  constructor() {}
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
    {
      ticketId: '154322',
      date: '12-03-2021',
      subject:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      details:
        "Details: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      status: 'Solved',
    },
    {
      ticketId: '1298876',
      date: '12-03-2021',
      subject:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      details:
        "Details: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      status: 'Solved',
    },
    {
      ticketId: '184746',
      date: '12-03-2021',
      subject:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      details:
        "Details: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      status: 'Running',
    },
    {
      ticketId: '987678',
      date: '12-03-2021',
      subject:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.',
      details:
        "Details: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      status: 'Solved',
    },
  ];
  selectedSupportTicket = undefined;
  toggleSort = true;

  ngOnInit(): void {}

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
