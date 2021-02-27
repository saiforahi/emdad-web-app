import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import swal from 'sweetalert';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  // isbuyer = true;
  error: any;
  msg;
  group: string;
  sellerRegForm: FormGroup;
  comName: AbstractControl;
  comPhone: AbstractControl;
  phonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  email: AbstractControl;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  password: AbstractControl;
  confPassword: AbstractControl;
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
  sellerRegFormData = new FormData();

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.hide();
    // this.group = this.router.url.split('/', 3)[1];
    // console.log(this.group);
    this.contry.allCountries().subscribe(item => {
      this.countryList = item.data;
    })
    this.sellerRegForm = this.fb.group({
      comName: ['', [Validators.required]],
      comPhone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]],
      confPassword: ['', [Validators.required]],
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
    this.comName = this.sellerRegForm.controls['comName'];
    this.comPhone = this.sellerRegForm.controls['comPhone'];
    this.email = this.sellerRegForm.controls['email'];
    this.password = this.sellerRegForm.controls['password'];
    this.confPassword = this.sellerRegForm.controls['confPassword'];
    this.comAddress = this.sellerRegForm.controls['comAddress'];
    this.comRegistration = this.sellerRegForm.controls['comRegistration'];
    this.expDate = this.sellerRegForm.controls['expDate'];
    this.country = this.sellerRegForm.controls['country'];
    this.city = this.sellerRegForm.controls['city'];
    this.area = this.sellerRegForm.controls['area'];
    this.zipCode = this.sellerRegForm.controls['zipCode'];
    this.agrreToPolicy = this.sellerRegForm.controls['agrreToPolicy'];
    this.attachments = this.sellerRegForm.controls['attachments'];
  }

  // area: "dhaka"
  // attachments: ""
  // city: "2"
  // comAddress: "south banasree, Block# G, R# 9/6, H# 43-45, Flat# 2B"
  // comName: "pial store"
  // comPhone: "01915245171"
  // comRegistration: ""
  // confPassword: "123"
  // country: "1"
  // email: "awronno.adhar@gmail.com"
  // expDate: "2021-02-17"
  // password: "123"
  // zipCode: "1219"

  // "email":"seller@user.com",
  // "password":"Abcd1234#",
  // "full_name":"Seller User",
  // "phone":"01755555555",
  // "gender":"F", 
  // "address":"Mirpur",
  // "store_address":"Shewrapara",
  // "store_name":"Iot Store",
  // "zip_code": 1216

  onSubmit(value) {
    // console.log(value);
    this.spinner.show();
    // var data = {"email":"seller@user.com",
    // "password":"Abcd1234#",
    // "full_name":"Seller User",
    // "phone":"01755555555",
    // "gender":"F", 
    // "address":"Mirpur",
    // "store_address":"Shewrapara",
    // "store_name":"Iot Store",
    // "zip_code": 1216}
    this.sellerRegFormData.append("email", value.email);
    this.sellerRegFormData.append("password", value.password);
    this.sellerRegFormData.append("store_name", value.comName);
    this.sellerRegFormData.append("phone", value.comPhone);
    this.sellerRegFormData.append("store_address", value.comAddress);
    this.sellerRegFormData.append("zip_code", value.zipCode);
    this.authService.sellerSignup(this.sellerRegFormData).subscribe(
      (success) => {
        console.log(success);
        this.router.navigate(['dashboard']);
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

  getciTyList(id){
    this.contry.allCities(id).subscribe(item => {
      this.cityList = item.data;
    })
  }

  matchBothPassord(pass1, pass2){
    console.log(pass1, pass2);
    if(pass1 != pass2){
      console.log(pass1, pass2);
      this.passMatched = true;
    }else {
      this.passMatched = false;
    }
  }

  showPass() {
    this.showPassState = true;
  }

  hidePass() {
    this.showPassState = false;
  }

  confShowPass() {
    this.confShowPassState = true;
  }

  confHidePass() {
    this.confShowPassState = false;
  }

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }

  removeFile(id){
    this.selectedImage.splice(id, 1);
  }
}
