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
import { config } from '../../../../config';

@Component({
  selector: 'app-edit-products-page',
  templateUrl: './edit-products-page.component.html',
  styleUrls: ['./edit-products-page.component.css']
})
export class EditProductsPageComponent implements OnInit {
  error: any;
  msg;
  group: string;
  productUpdateForm: FormGroup;
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
  subCategories: any = [];
  childCategories: any = [];
  selectedImage: any = [];
  unitList: any;
  brandList: any;
  imgPreviewList = [];
  selectedFiles: any = [];
  productId: any;
  productDetails: any;
  parentCatId: any;
  subCatId: any;
  childCatId: any;
  brandId: any;
  unitId: any;
  existingImgList = [];
  existingFiles: any;

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
    console.log(localStorage.getItem('s_token'))
    this.productId = this.route.snapshot.params['id'];
    this.categoryServices.category().subscribe((item) => {
      this.categories = item;
      this.populateFormData();
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
    this.productUpdateForm = this.fb.group({
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
    this.category = this.productUpdateForm.controls['category'];
    this.subCategory = this.productUpdateForm.controls['subCategory'];
    this.childCategory = this.productUpdateForm.controls['childCategory'];
    this.prodName = this.productUpdateForm.controls['prodName'];
    this.prodDetails = this.productUpdateForm.controls['prodDetails'];
    this.manufactererName = this.productUpdateForm.controls['manufactererName'];
    this.prodStock = this.productUpdateForm.controls['prodStock'];
    this.prodSize = this.productUpdateForm.controls['prodSize'];
    this.unitOfMeasure = this.productUpdateForm.controls['unitOfMeasure'];
    this.prodUnit = this.productUpdateForm.controls['prodUnit'];
    this.prodDeliMethod = this.productUpdateForm.controls['prodDeliMethod'];
    this.leadTime = this.productUpdateForm.controls['leadTime'];
    this.ddp = this.productUpdateForm.controls['ddp'];
    this.prodPrice = this.productUpdateForm.controls['prodPrice'];
    this.prodImage = this.productUpdateForm.controls['prodImage'];
    this.attachments = this.productUpdateForm.controls['attachments'];
  }

  populateFormData() {
    this.getProducts.productDetails(this.productId).subscribe(item => {
      console.log(item);
      this.productDetails = item.data[0];
      this.childCatId = item.data[0].category.id;
      this.brandId = this.productDetails.brand.id;
      this.unitId = this.productDetails.unit.id;
      var setLeadTime;
      if(this.productDetails.delivery_method == 1){
        setLeadTime = this.productDetails.ddp_lead_time;
      }else {
        setLeadTime = this.productDetails.ex_works_lead_time;
      }
      this.removeEmptyChildren(this.categories);
      // console.log(this.childCatId);
      this.productUpdateForm.setValue({
        category: this.parentCatId,
        subCategory: this.subCatId,
        childCategory: this.childCatId,
        prodName: this.productDetails.name,
        prodDetails: this.productDetails.description,
        manufactererName: this.productDetails.brand.id,
        prodStock: this.productDetails.stock_quantity,
        prodSize: null,
        unitOfMeasure: this.productDetails.unit.id,
        prodUnit: this.productDetails,
        prodDeliMethod: this.productDetails.delivery_method,
        leadTime: setLeadTime,
        ddp: this.productDetails.pickup_address.length != 0 ? this.productDetails.pickup_address.address : '',
        prodPrice: this.productDetails.unit_price,
        prodImage: null,
        attachments: null
      })
      if(this.productDetails.image1 != null){
        this.existingImgList.push({"link": config.img_base_url+this.productDetails.image1});
      }
      if(this.productDetails.image2 != null){
        this.existingImgList.push({"link": config.img_base_url+this.productDetails.image2});
      }
      this.existingFiles = this.productDetails.attachment.length != 0 ? this.productDetails.attachment : [];
      console.log(this.existingImgList)
    })
  }

  fileNameExtarc(path){
    var initialPathArray = path.split('/');
    return initialPathArray[initialPathArray.length - 1];
  }

  // remove empty children form the array
  removeEmptyChildren(data) {
    data.forEach((key) => {
      // console.log(key)
      key.children.forEach((key2) => {
        // console.log(key2)
        this.subCategories.push(key2);
        key2.children.forEach((key3) => {
          // console.log(key3.id, this.childCatId)
          this.childCategories.push(key3);
          // get parent and subcat Id
          if(key3.id == this.childCatId){
            this.parentCatId = key.id;
            this.subCatId = key2.id;
            console.log(this.parentCatId, this.subCatId)
          }
          key3.children.forEach((key4) => {
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
    console.log(this.childCategories)
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
    this.addProductService.updateProduct(this.productUploadFormData, localStorage.getItem("s_uid")).subscribe(
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
