import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddProductService } from 'src/app/shared/services/add-product.service';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';
import { AddBrandModalComponent } from '../../components/add-brand-modal/add-brand-modal.component';
import { AddColorModalComponent } from '../../components/add-color-modal/add-color-modal.component';
import { AddUnitModalComponent } from '../../components/add-unit-modal/add-unit-modal.component';

@Component({
  selector: 'app-upload-products-page',
  templateUrl: './upload-products-page.component.html',
  styleUrls: ['./upload-products-page.component.css'],
})
export class UploadProductsPageComponent implements OnInit {
  error: any;
  msg;
  selectedOption: any="-1";
  group: string;
  productUploadForm: FormGroup;
  category: AbstractControl;
  shopPick: AbstractControl;
  subCategory: AbstractControl;
  childCategory: AbstractControl;
  prodName: AbstractControl;
  prodDetails: AbstractControl;
  manufactererName: AbstractControl;
  prodStock: AbstractControl;
  prodSize:AbstractControl;
  prodUnit: AbstractControl;
  prodDeliMethod: AbstractControl;
  leadTime: AbstractControl;
  ddp: AbstractControl;
  ddp_destination:AbstractControl;
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
  currentAddedBrand: any;
  currentAddedColor: any;
  currentAddedUnit: any;
  size:any
  sizeList:Array<any>=[]
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService,
    private categoryServices: GetCategoryService,
    private addProductService: AddProductService,
    private authService: UserAuthService,
    private subscription: SubscriptionService,
    public dialog: MatDialog,
    private translate:TranslateService
  ) {
    this.authService.s_uId.subscribe((s_uid) => {
      console.log(s_uid);
      if (s_uid != null) {
        this.authService.sellerIsApproved(s_uid).subscribe((item: any) => {
          console.log(item);
          // Approved User, User Not Approve
          this.subscription.isSubscribed().subscribe((item2: any) => {
            console.log(item2);
            // User Not Subscribe, Subscribe User
            if (
              item.message != 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              this.router.navigate(['/dashboard/welcome']);
            } else if (
              item.message == 'Approved User' &&
              item2.message != 'Subscribe User'
            ) {
              swal(
                'Access Denied!',
                'you are not subscribed to any plan! Please subscribe.',
                'error'
              );
              this.router.navigate(['/dashboard/subscription-plan']);
            }
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.categoryServices.category().subscribe((item) => {
      this.removeEmptyChildren(item);
      this.categories = item;
      // console.log(this.categories[0].name);
    });
    this.addProductService.getUnitOfProduct().subscribe((item) => {
      this.unitList = item.data[0];
      // console.log(item.data[0]);
    });
    this.addProductService.getBrandList().subscribe((item) => {
      this.brandList = item.data[0];
      console.log(item.data[0]);
    });
    // this.addProductService.getColorList().subscribe((item) => {
    //   this.sizeList = item.data[0];
    //   console.log(item.data[0]);
    // });
    this.productUploadForm = this.fb.group({
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      childCategory: ['', [Validators.required]],
      prodName: ['', [Validators.required]],
      prodDetails: [''],
      manufactererName: [''],
      prodSize: [''],
      prodStock: ['', [Validators.required]],
      prodUnit: [''],
      prodDeliMethod: ['', [Validators.required]],
      leadTime: ['', [Validators.required]],
      ddp: [''],
      ddp_destination:[''],
      shopPick: [''],
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
    this.prodUnit = this.productUploadForm.controls['prodUnit'];
    this.prodDeliMethod = this.productUploadForm.controls['prodDeliMethod'];
    this.leadTime = this.productUploadForm.controls['leadTime'];
    this.ddp = this.productUploadForm.controls['ddp'];
    this.ddp_destination=this.productUploadForm.controls['ddp_destination'];
    this.shopPick = this.productUploadForm.controls['shopPick'];
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

  addNewBrand(value) {
    if (value == 'new') {
      this.openAddBrandDialog();
    }
  }

  openAddBrandDialog() {
    const dialogRef = this.dialog.open(AddBrandModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null && result.length>0) {
        this.spinner.show();
         console.log(`Dialog result: ${result}`);
        this.addProductService.addBrand(result).subscribe(
          (success: any) => {
            this.currentAddedBrand = success.data[0].id;
            this.addProductService.getBrandList().subscribe((item) => {
              this.brandList = item.data[0];
              console.log(item.data[0]);
            });
            this.spinner.hide();
            swal('Succeed', success.message, 'success');
          },
          (error: any) => {
            console.log(error);
            this.manufactererName.reset('');
            this.spinner.hide();
            swal('Failed!', error.error.name[0], 'error');
          }
        );
      }
      else{
        
      }
    });
  }

  // addNewSize(value) {
  //   if (value == 'new') {
  //     this.openAddColorDialog();
  //   }
  // }

  // openAddColorDialog() {
  //   const dialogRef = this.dialog.open(AddColorModalComponent);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result != null) {
  //       this.spinner.show();
  //       // console.log(`Dialog result: ${result}`);
  //       this.addProductService.addColor(result).subscribe(
  //         (success: any) => {
  //           this.currentAddedColor = success.data[0].id;
  //           this.addProductService.getColorList().subscribe((item) => {
  //             this.sizeList = item.data[0];
  //             console.log(item.data[0]);
  //           });
  //           this.spinner.hide();
  //           swal('Succeed', success.message, 'success');
  //         },
  //         (error: any) => {
  //           console.log(error);
  //           this.prodSize.reset('');
  //           this.spinner.hide();
  //           swal('Failed!', error.error.name[0], 'error');
  //         }
  //       );
  //     }
  //   });
  // }

  addNewUnit(value:any) {
    if (value == 'new') {
      this.openAddUnitDialog();
    }
  }

  openAddUnitDialog() {
    const dialogRef = this.dialog.open(AddUnitModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.spinner.show();
        // console.log(`Dialog result: ${result}`);
        this.addProductService.addUnit(result).subscribe(
          (success: any) => {
            this.currentAddedUnit = success.data[0].id;
            this.addProductService.getUnitOfProduct().subscribe((item) => {
              this.unitList = item.data[0];
              // console.log(item.data[0]);
            });
            this.spinner.hide();
            swal('Succeed', success.message, 'success');
          },
          (error: any) => {
            console.log(error);
            this.prodUnit.reset('');
            this.spinner.hide();
            swal('Failed!', error.error.name[0], 'error');
          }
        );
      }
    });
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
    if (value.ddp == '2') {
      this.productUploadFormData.append('pickup_address[0]city', '1');
      this.productUploadFormData.append(
        'pickup_address[0]address',
        value.shopPick
      );
    }
    this.productUploadFormData.append('brand', value.manufactererName);
    this.productUploadFormData.append('unit', value.prodUnit);
    this.productUploadFormData.append('size', value.prodSize);
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
      this.productUploadFormData.append('ex_works_lead_time', '0');
      this.productUploadFormData.append('ddp_destination',value.ddp_destination)
    } else if (value.prodDeliMethod == 2) {
      this.productUploadFormData.append('ddp_lead_time', '0');
      this.productUploadFormData.append('ex_works_lead_time', value.leadTime);
    }
    this.productUploadFormData.append('stock_quantity', value.prodStock);
    this.productUploadFormData.append('status', '1');
    if (this.selectedImage.length > 0)
      this.productUploadFormData.append(
        'image1',
        this.selectedImage[0],
        this.selectedImage[0].name
      );
    if (this.selectedImage.length > 1)
      this.productUploadFormData.append(
        'image2',
        this.selectedImage[1],
        this.selectedImage[1].name
      );
    this.addProductService.addProduct(this.productUploadFormData).subscribe(
      (success) => {
        console.log(success);
        this.productUploadForm.reset();
        this.category.reset('');
        this.subCategory.reset('');
        this.childCategory.reset('');
        this.manufactererName.reset('');
        this.prodSize.reset('');
        this.prodUnit.reset('');
        this.imgPreviewList = [];
        this.selectedImage = [];
        this.selectedFiles = [];
        this.spinner.hide();
        swal('Succeed', success.message, 'success');
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
        swal('Failed!', 'Error in Submission', 'error');
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

  change_placeholder(value:any){
    if(value=='1'){
      this.translate.get('Seller_Upload_Product.ddp_lead_time').subscribe((res: string) => {
        console.log(res);
        document.getElementById('leadTime').setAttribute('placeholder',res)
        //=> 'hello world'
      });
    }
    else if(value=='2'){
      this.translate.get('Seller_Upload_Product.Ex_Works_20_days').subscribe((res: string) => {
        console.log(res);
        document.getElementById('leadTime').setAttribute('placeholder',res)
      });
    }
    
  }
}
