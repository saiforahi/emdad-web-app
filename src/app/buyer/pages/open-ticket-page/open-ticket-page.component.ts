import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { NgxSpinnerService } from 'ngx-spinner';

import { TicketService } from '../../../shared/services/ticket.service';

@Component({
  selector: 'app-open-ticket-page',
  templateUrl: './open-ticket-page.component.html',
  styleUrls: ['./open-ticket-page.component.css'],
})
export class OpenTicketPageComponent implements OnInit {
  selectedImage: any = 0;
  submitted = false;

  // ticketForm for taking input from html form
  ticketForm = this.formBuilder.group({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    order_code: '',
    image: '',
  });
  // but we'll need FormData to submit image
  ticketFormData = new FormData();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    let uid = localStorage.getItem('uid');
    if (uid === null) {
      this.router.navigate(['/']);
    }

    this.ticketFormData.append('user', uid);
  }

  onSubmit(): void {
    this.submitted = true;
    this.spinner.show();
    if (
      this.ticketForm.get('title').errors === null &&
      this.ticketForm.get('description').errors === null
    ) {
      // converting to FormData
      this.ticketFormData.append('title', this.ticketForm.value.title);
      this.ticketFormData.append(
        'description',
        this.ticketForm.value.description
      );
      this.ticketFormData.append(
        'order_code',
        this.ticketForm.value.order_code
      );

      this.ticketService.openTicket(this.ticketFormData).subscribe(
        (response) => {
          this.spinner.hide();
          // console.log(response);
          this.router.navigate(['/support-ticket']);
          swal('Created!', 'Support ticket created successfully', 'success');
        },
        (error) => {
          this.spinner.hide();
          swal(
            'Ticket Creation Error',
            'Support ticket creatiion failed',
            'error'
          );
        }
      );
    } else {
      this.spinner.hide();
    }
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage = event.target.files[0];

    reader.readAsDataURL(this.selectedImage);
    reader.onload = function (readEvent: any) {
      document
        .getElementById('preview')
        .setAttribute('src', readEvent.target.result);
    };

    // putting the image in formData
    this.ticketFormData.append(
      'image',
      this.selectedImage,
      this.selectedImage.name
    );
    // console.log(this.selectedImage);
    // console.log(this.selectedImage.name);
  }

  removeImage() {
    this.selectedImage = null;
    // removing the image from form data too
    this.ticketFormData.delete('image');
  }
}
