import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-open-ticket-modal',
  templateUrl: './open-ticket-modal.component.html',
  styleUrls: ['./open-ticket-modal.component.css'],
})
export class OpenTicketModalComponent implements OnInit {
  error: any;
  msg;
  group: string;
  productUploadForm: FormGroup;
  prodName: AbstractControl;
  prodDetails: AbstractControl;
  prodImage: AbstractControl;
  productUploadFormData: any;
  selectedImage: any;

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.productUploadForm = this.fb.group({
      prodName: ['', [Validators.required]],
      prodDetails: [''],
      prodImage: [''],
    });
    this.prodName = this.productUploadForm.controls['prodName'];
    this.prodDetails = this.productUploadForm.controls['prodDetails'];
    this.prodImage = this.productUploadForm.controls['prodImage'];
  }

  onSubmit(value) {
    // console.log(value);
    this.spinner.show();
    this.productUploadFormData.append('email', value.email);
    this.productUploadFormData.append('password', value.password);
    this.productUploadFormData.append('store_name', value.prodName);
    this.productUploadFormData.append('phone', value.prodDetails);
    this.productUploadFormData.append('store_address', value.comAddress);
    this.productUploadFormData.append('zip_code', value.zipCode);
    this.authService.sellerSignup(this.productUploadFormData).subscribe(
      (success) => {
        console.log(success);
        swal('Succeed', 'You have registered successfully', 'success');
      },
      (error: any) => {
        this.error = error.error.email.toString();
        console.log(error);
        // if(error.email){
        //   swal('Failed!', error.email, 'error');
        // }
        swal('Failed!', this.error, 'error');
      }
    );
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }

  removeFile(id) {
    this.selectedImage.splice(id, 1);
  }
}
