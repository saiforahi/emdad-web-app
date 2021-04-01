import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
/* import { UserAuthService } from 'src/app/shared/services/user-auth.service'; */
import swal from 'sweetalert';
import { Router } from '@angular/router';

import { TicketService } from '../../../../shared/services/ticket.service';

@Component({
  selector: 'app-open-ticket-modal',
  templateUrl: './open-ticket-modal.component.html',
  styleUrls: ['./open-ticket-modal.component.css'],
})
export class OpenTicketModalComponent implements OnInit {
  /** INITIALIZATION */
  error: any;
  msg;
  group: string;

  fileName;
  imgDisplay:any=[];
  title: AbstractControl;
  description: AbstractControl;
  image: AbstractControl;
isEnabled:boolean = true;
  selectedImage: any ;
  newArray:any=[];
    /** Form data initialization */
  ticketForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: [''],
  });
  ticketFormData = new FormData();
  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
 
    private ticketService: TicketService,
    private router: Router,
 
  ) { }
  ngOnInit(): void {
  /**Get current seller's id */
    let uid = localStorage.getItem('s_uid');
     if(uid === null){
       this.router.navigate(['/']);
     }
    this.ticketFormData.append('user', uid);

    this.title = this.ticketForm.controls['title'];
    this.description = this.ticketForm.controls['description'];
    this.image = this.ticketForm.controls['image'];




  }

/** FORM SUBMISSION */
  onSubmit():void {
    // console.log(value);
   this.ticketFormData.append('title',this.ticketForm.value.title);
   this.ticketFormData.append('description',this.ticketForm.value.description);
   this.ticketService.openTicket(this.ticketFormData).subscribe((response) =>{
     console.log(response);
     this.router.navigate(['/dashboard/support']);
     swal("Created!","Support ticket created successfully","success");
     
   })


  }
/** FILE SELECT AND UPLOAD TO FORM FUNCTION */
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
  console.log(this.selectedImage);
  console.log(this.selectedImage.name);
}


/***REMOVE FILE FROM FORM */
  removeFile() {
   /*  this.selectedImage.splice(id, 1);
    if(this.selectedImage.length == 0 || this.selectedImage.length < 2){
      this.isEnabled = true;
    
    } */
    this.selectedImage = null;
    this.ticketFormData.delete('image');
  }
}
