import { Component, OnInit } from '@angular/core';
import { FileService } from '../../../../shared/services/file.service';
import * as fileSaver from 'file-saver';
import { TicketService } from '../../../../shared/services/ticket.service';
@Component({
  selector: 'app-ticket-view-modal',
  templateUrl: './ticket-view-modal.component.html',
  styleUrls: ['./ticket-view-modal.component.css']
})
export class TicketViewModalComponent implements OnInit {
  supportTicketData = [];
  constructor() { }

  ngOnInit(): void {
  }

}
