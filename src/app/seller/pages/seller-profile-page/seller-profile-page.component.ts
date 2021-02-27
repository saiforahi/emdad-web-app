import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-seller-profile-page',
  templateUrl: './seller-profile-page.component.html',
  styleUrls: ['./seller-profile-page.component.css'],
})
export class SellerProfilePageComponent implements OnInit {
  sellerProfileForm: FormGroup;
  comName: AbstractControl;
  comPhone: AbstractControl;
  phonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  email: AbstractControl;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  comAddress: AbstractControl;
  comRegistration: AbstractControl;
  expDate: AbstractControl;
  country: AbstractControl;
  city: AbstractControl;
  area: AbstractControl;
  zipCode: AbstractControl;
  attachments: AbstractControl;
  showPassState: boolean = false;
  confShowPassState: boolean = false;
  selectedImage: any = [];
  regBtnDisabled = true;
  passMatched: boolean = false;
  countryList: any;
  cityList: any;
  agrreToPolicy: any;
  sellerProfileFormData = new FormData();
  error: any;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.contry.allCountries().subscribe(item => {
      this.countryList = item.data;
    })
    this.sellerProfileForm = this.fb.group({
      comName: ['', [Validators.required]],
      comPhone: [
        '',
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      comAddress: ['', [Validators.required]],
      comRegistration: [''],
      expDate: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      area: [''],
      zipCode: [''],
      agrreToPolicy: ['', [Validators.required]],
      attachments: [''],
    });
    this.comName = this.sellerProfileForm.controls['comName'];
    this.comPhone = this.sellerProfileForm.controls['comPhone'];
    this.email = this.sellerProfileForm.controls['email'];
    this.comAddress = this.sellerProfileForm.controls['comAddress'];
    this.comRegistration = this.sellerProfileForm.controls['comRegistration'];
    this.expDate = this.sellerProfileForm.controls['expDate'];
    this.country = this.sellerProfileForm.controls['country'];
    this.city = this.sellerProfileForm.controls['city'];
    this.area = this.sellerProfileForm.controls['area'];
    this.zipCode = this.sellerProfileForm.controls['zipCode'];
    this.agrreToPolicy = this.sellerProfileForm.controls['agrreToPolicy'];
    this.attachments = this.sellerProfileForm.controls['attachments'];
  }

  onSubmit(value) {
    // console.log(value);
    this.spinner.show();
    this.sellerProfileFormData.append('email', value.email);
    this.sellerProfileFormData.append('password', value.password);
    this.sellerProfileFormData.append('store_name', value.comName);
    this.sellerProfileFormData.append('phone', value.comPhone);
    this.sellerProfileFormData.append('store_address', value.comAddress);
    this.sellerProfileFormData.append('zip_code', value.zipCode);
    // this.authService.sellerSignup(this.sellerProfileFormData).subscribe(
    //   (success) => {
    //     console.log(success);
    //     this.router.navigate(['dashboard']);
    //     swal('Succeed', 'You have registered successfully', 'success');
    //   },
    //   (error: any) => {
    //     this.error = error.error.email.toString();
    //     console.log(error);
    //     // if(error.email){
    //     //   swal('Failed!', error.email, 'error');
    //     // }
    //     swal('Failed!', this.error, 'error');
    //   }
    // );
  }

  getciTyList(id) {
    this.contry.allCities(id).subscribe((item) => {
      this.cityList = item.data;
    });
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
