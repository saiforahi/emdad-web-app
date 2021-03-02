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
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-upload-products-page',
  templateUrl: './upload-products-page.component.html',
  styleUrls: ['./upload-products-page.component.css'],
})
export class UploadProductsPageComponent implements OnInit {
  error: any;
  msg;
  group: string;
  productUploadForm: FormGroup;
  prodName: AbstractControl;
  prodDetails: AbstractControl;
  manufactererName: AbstractControl;
  prodStock: AbstractControl;
  prodSize: AbstractControl;
  unitOfMeasure: AbstractControl;
  prodDeliMethod: AbstractControl;
  leadTime: AbstractControl;
  ddp: AbstractControl;
  prodPrice: AbstractControl;
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
  prodImage: AbstractControl;
  attachments: AbstractControl;
  productUploadFormData = new FormData();
  categories: any;
  subCategories: any;
  childCategories: any;
  selectedImage: any;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService,
    private categoryServices: GetCategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryServices.category().subscribe((item) => {
      this.removeEmptyChildren(item);
      this.categories = item;
      console.log(this.categories[0].name);
    });
    this.productUploadForm = this.fb.group({
      prodName: ['', [Validators.required]],
      prodDetails: [''],
      manufactererName: [''],
      prodSize: [''],
      prodStock: [''],
      unitOfMeasure: [''],
      prodDeliMethod: [''],
      leadTime: [''],
      ddp: [''],
      prodPrice: [''],
      prodImage: [''],
      attachments: [''],
    });
    this.prodName = this.productUploadForm.controls['prodName'];
    this.prodDetails = this.productUploadForm.controls['prodDetails'];
    this.manufactererName = this.productUploadForm.controls['manufactererName'];
    this.prodStock = this.productUploadForm.controls['prodStock'];
    this.prodSize = this.productUploadForm.controls['prodSize'];
    this.unitOfMeasure = this.productUploadForm.controls['unitOfMeasure'];
    this.prodDeliMethod = this.productUploadForm.controls['prodDeliMethod'];
    this.leadTime = this.productUploadForm.controls['leadTime'];
    this.ddp = this.productUploadForm.controls['ddp'];
    this.prodPrice = this.productUploadForm.controls['prodPrice'];
    this.prodImage = this.productUploadForm.controls['prodImage'];
    this.attachments = this.productUploadForm.controls['attachments'];
  }

  // remove empty children form the array
  removeEmptyChildren(data) {
    data.forEach((key) => {
      key.children.forEach((key2) => {
        key2.children.forEach((key3) => {
          key3.children.forEach((key4) => {
            key3.children.forEach((key5) => {
              if (key5.children.length == 0) {
                delete key5.children;
              }
            });
            if (key4.children.length == 0) {
              delete key4.children;
            }
          });
          if (key3.children.length == 0) {
            delete key3.children;
          }
        });
        if (key2.children.length == 0) {
          delete key2.children;
        }
      });
      if (key.children.length == 0) {
        delete key.children;
      }
    });
  }

  setSubCAt(catId){
    this.subCategories = this.categories.find(item => item.id == catId).children;
  }

  setChildCAt(subCatId){
    this.childCategories = this.subCategories.find(item => item.id == subCatId).children;
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

  handleFileSelect(event) {
    var reader = new FileReader();
    this.selectedImage.push(event.target.files[0]);
    console.log(this.selectedImage);
  }

  removeFile(id) {
    this.selectedImage.splice(id, 1);
  }
}
