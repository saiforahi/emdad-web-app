import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddProductService } from 'src/app/shared/services/add-product.service';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { GetProductService } from 'src/app/shared/services/get-product.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-products-page',
  templateUrl: './edit-products-page.component.html',
  styleUrls: ['./edit-products-page.component.css']
})
export class EditProductsPageComponent implements OnInit {
  error: any;
  msg;
  group: string;
  productUploadForm: FormGroup;
  category: AbstractControl;
  subCategory: AbstractControl;
  childCategory: AbstractControl;
  prodName: AbstractControl;
  prodDetails: AbstractControl;
  manufactererName: AbstractControl;
  prodStock: AbstractControl;
  prodSize: AbstractControl;
  unitOfMeasure: AbstractControl;
  prodUnit: AbstractControl;
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
  selectedImage: any = [];
  unitList: any;
  brandList: any;
  imgPreviewList = [];
  selectedFiles: any = [];
  categoryId: any;
  productDetails: any;
  parentCatId: any;
  subCatId: any;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService,
    private categoryServices: GetCategoryService,
    private addProductService: AddProductService,
    private getProducts: GetProductService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    this.categoryServices.category().subscribe((item) => {
      this.removeEmptyChildren(item);
      this.categories = item;
      // this.getParentCat();
      // console.log(this.categories[0].name);
    });
    this.addProductService.getUnitOfProduct().subscribe((item) => {
      this.unitList = item.data[0];
      // console.log(item.data[0]);
    });
    this.addProductService.getBrandList().subscribe((item) => {
      this.brandList = item.data[0];
      // console.log(item.data[0]);
    });
    // this.populateFormData();
    this.productUploadForm = this.fb.group({
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      childCategory: ['', [Validators.required]],
      prodName: ['', [Validators.required]],
      prodDetails: [''],
      manufactererName: [''],
      prodSize: [''],
      prodStock: ['', [Validators.required]],
      unitOfMeasure: ['', [Validators.required]],
      prodUnit: ['', [Validators.required]],
      prodDeliMethod: ['', [Validators.required]],
      leadTime: ['', [Validators.required]],
      ddp: ['', [Validators.required]],
      prodPrice: ['', [Validators.required]],
      prodImage: [''],
      attachments: [''],
    });
    this.category = this.productUploadForm.controls['category'];
    this.subCategory = this.productUploadForm.controls['subCategory'];
    this.childCategory = this.productUploadForm.controls['childCategory'];
    this.prodName = this.productUploadForm.controls['prodName'];
    this.prodDetails = this.productUploadForm.controls['prodDetails'];
    this.manufactererName = this.productUploadForm.controls['manufactererName'];
    this.prodStock = this.productUploadForm.controls['prodStock'];
    this.prodSize = this.productUploadForm.controls['prodSize'];
    this.unitOfMeasure = this.productUploadForm.controls['unitOfMeasure'];
    this.prodUnit = this.productUploadForm.controls['prodUnit'];
    this.prodDeliMethod = this.productUploadForm.controls['prodDeliMethod'];
    this.leadTime = this.productUploadForm.controls['leadTime'];
    this.ddp = this.productUploadForm.controls['ddp'];
    this.prodPrice = this.productUploadForm.controls['prodPrice'];
    this.prodImage = this.productUploadForm.controls['prodImage'];
    this.attachments = this.productUploadForm.controls['attachments'];
  }

  populateFormData() {
    this.getProducts.productDetails(this.categoryId).subscribe(item => {
      console.log(item);
      console.log(this.parentCatId)
      this.productDetails = item.data[0];
      this.productUploadForm.setValue({
        category: this.parentCatId,
        subCategory: this.subCatId,
        childCategory: this.categoryId,
        prodName: this.productDetails.name,
        prodDetails: "hello",
        manufactererName: "nike",
        prodStock: 2,
        prodSize: 10,
        unitOfMeasure: 1,
        prodUnit: 10,
        prodDeliMethod: 2,
        leadTime: 12,
        ddp: "dhaka",
        prodPrice: 150,
        prodImage: null,
        attachments: null
      })
    })
  }

  // remove empty children form the array
  removeEmptyChildren(data) {
    data.forEach((key) => {
      // console.log(key.id)
      key.children.forEach((key2) => {
        // console.log(key2.id)
        key2.children.forEach((key3) => {
          // console.log(key3.id, this.categoryId)
          // get parent and subcat Id
          if(key3.id == this.categoryId){
            this.parentCatId = key2.id;
            this.subCatId = key.id;
            // console.log(this.parentCatId, this.subCatId)
          }
          key3.children.forEach((key4) => {
            console.log(key4.id)
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
    this.populateFormData();
  }

  setSubCAt(catId) {
    this.subCategories = this.categories.find(
      (item) => item.id == catId
    ).children;
  }

  setChildCAt(subCatId) {
    this.childCategories = this.subCategories.find(
      (item) => item.id == subCatId
    ).children;
  }

  onSubmit(value) {
    this.spinner.show();
    this.productUploadFormData.append('category', value.childCategory);
    // this.productUploadFormData.append('attachment', this.selectedFiles[0], this.selectedFiles[0].name);
    for (var i = 0; i < this.selectedFiles.length; i++) {
      this.productUploadFormData.append(
        `attachment[${i}]path`,
        this.selectedFiles[i],
        this.selectedFiles[i].name
      );
    }
    this.productUploadFormData.append('pickup_address.address', value.ddp);
    this.productUploadFormData.append('brand', value.manufactererName);
    this.productUploadFormData.append('unit', value.prodUnit);
    this.productUploadFormData.append('seller', localStorage.getItem('s_uid'));
    this.productUploadFormData.append('name', value.prodName);
    this.productUploadFormData.append(
      'slug',
      value.prodName.replace(/\s+/g, '-').toLowerCase()
    );
    this.productUploadFormData.append('description', value.prodDetails);
    this.productUploadFormData.append('unit_price', value.prodPrice);
    this.productUploadFormData.append('delivery_method', value.prodDeliMethod);
    if (value.prodDeliMethod == 1) {
      this.productUploadFormData.append('ddp_lead_time', value.leadTime);
      this.productUploadFormData.append('ex_works_lead_time', null);
    } else if (value.prodDeliMethod == 2) {
      this.productUploadFormData.append('ddp_lead_time', null);
      this.productUploadFormData.append('ex_works_lead_time', value.leadTime);
    }
    this.productUploadFormData.append('stock_quantity', value.prodStock);
    this.productUploadFormData.append('status', '1');
    if (this.selectedImage.length > 0)
      this.productUploadFormData.append('image1', this.selectedImage[0], this.selectedImage[0].name);
    if (this.selectedImage.length > 1)
      this.productUploadFormData.append('image2', this.selectedImage[1], this.selectedImage[1].name);
    this.addProductService.addProduct(this.productUploadFormData).subscribe(
      (success) => {
        console.log(success);
        this.spinner.hide();
        swal('Succeed', success.message, 'success');
      },
      (error: any) => {
        console.log(error);
        swal('Failed!', this.error, 'error');
      }
    );
  }

  handleImgSelect(event) {
    this.selectedImage.push(event.target.files[0]);
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imgPreviewList.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      event.srcElement.value = null;
    }
  }

  removeImg(id) {
    this.selectedImage.splice(id, 1);
    this.imgPreviewList.splice(id, 1);
  }

  handleFileSelect(event) {
    this.selectedFiles.push(event.target.files[0]);
    // console.log(this.selectedFiles);
    event.srcElement.value = null;
    // this.selectedFiles.forEach(element => {
    //   var id = 0;
    //   this.finalFilseList.push({"id": id, })
    // });
  }

  removeFile(id) {
    this.selectedFiles.splice(id, 1);
  }

}
