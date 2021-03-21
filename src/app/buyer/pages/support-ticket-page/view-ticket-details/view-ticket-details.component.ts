import { Component, OnInit ,Inject} from '@angular/core';
import * as fileSaver from 'file-saver';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from '../../../../shared/services/file.service';
import { TicketService } from '../../../../shared/services/ticket.service';

@Component({
  selector: 'app-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.css']
})
export class ViewTicketDetailsComponent implements OnInit {
details:any;
status = ['Initiative', 'Undergoing', 'Resolved'];
  constructor(private fileService: FileService,
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) data: { supportData: any } ) {
      this.details=data.supportData;
     }

  ngOnInit(): void {
  }
  get_image_name(image_url: string) {
    let param_array = image_url.split('/');
    return param_array[param_array.length - 1];
  }
  download(ticket_image_url: string) {
    this.fileService.downloadFile(ticket_image_url).subscribe((response) => {
      // console.log(response);
      let blob: any = new Blob([response], {
        type: 'text/plain;charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, 'employees.jpg');
    }),
      (error) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }
}
