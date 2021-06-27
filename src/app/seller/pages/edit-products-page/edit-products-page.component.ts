import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddProductService } from 'src/app/shared/services/add-product.service';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { GetCategoryService } from 'src/app/shared/services/get-category.service';
import { GetProductService } from 'src/app/shared/services/get-product.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';
import { config } from '../../../../config';
import { AddBrandModalComponent } from '../../components/add-brand-modal/add-brand-modal.component';
import { AddUnitModalComponent } from '../../components/add-unit-modal/add-unit-modal.component';
import { DialogueComponent } from '../sller-products-page/dialogue/dialogue.component';
@Component({
  selector: 'app-edit-products-page',
  templateUrl: './edit-products-page.component.html',
  styleUrls: ['./edit-products-page.component.css'],
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
  prodUnit: AbstractControl;
  prodDeliMethod: AbstractControl;
  leadTime: AbstractControl;
  // ddp: AbstractControl;
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
  shopPick:AbstractControl;
  ddp_destination:AbstractControl;
  parentCatId: any;
  subCatId: any;
  childCatId: any;
  brandId: any;
  unitId: any;
  existingImgList = [];
  existingFiles: any;
  selectedOption: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: NgxSpinnerService,
    private categoryServices: GetCategoryService,
    private addProductService: AddProductService,
    private getProducts: GetProductService,
    private authService: UserAuthService,
    private subscription: SubscriptionService,
    public dialog: MatDialog,
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
    this.existingImgList = [];
    console.log(localStorage.getItem('s_token'));
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
    // this.addProductService.getColorList().subscribe((item) => {
    //   this.colorList = item.data[0];
    //   console.log(item.data[0]);
    // });
    // this.populateFormData();
    this.productUpdateForm = this.fb.group({
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      childCategory: ['', [Validators.required]],
      prodName: ['', [Validators.required]],
      prodDetails: [''],
      manufactererName: ['', [Validators.required]],
      prodSize: [''],
      prodStock: ['', [Validators.required]],
      prodUnit: ['', [Validators.required]],
      prodDeliMethod: ['', [Validators.required]],
      leadTime: ['', [Validators.required]],
      // ddp: ['', [Validators.required]],
      ddp_destination: [''],
      prodPrice: ['', [Validators.required]],
      prodImage: [''],
      attachments: [''],
      shopPick:[''],
    });
    this.category = this.productUpdateForm.controls['category'];
    this.subCategory = this.productUpdateForm.controls['subCategory'];
    this.childCategory = this.productUpdateForm.controls['childCategory'];
    this.prodName = this.productUpdateForm.controls['prodName'];
    this.prodDetails = this.productUpdateForm.controls['prodDetails'];
    this.manufactererName = this.productUpdateForm.controls['manufactererName'];
    this.prodStock = this.productUpdateForm.controls['prodStock'];
    this.prodSize = this.productUpdateForm.controls['prodSize'];
    this.prodUnit = this.productUpdateForm.controls['prodUnit'];
    this.prodDeliMethod = this.productUpdateForm.controls['prodDeliMethod'];
    this.ddp_destination = this.productUpdateForm.controls['ddp_destination'];
    this.leadTime = this.productUpdateForm.controls['leadTime'];
    // this.ddp = this.productUpdateForm.controls['ddp'];
    this.prodPrice = this.productUpdateForm.controls['prodPrice'];
    this.prodImage = this.productUpdateForm.controls['prodImage'];
    this.attachments = this.productUpdateForm.controls['attachments'];
    this.shopPick= this.productUpdateForm.controls['shopPick'];
  }

  populateFormData() {
    this.existingImgList = [];
    this.getProducts.productDetails(this.productId).subscribe((item) => {
      console.log(item.data[0]);
      console.log('ddp_destination',item.data[0].ddp_destination);
      this.productDetails = item.data[0];
      this.childCatId = item.data[0].category.id;
      this.brandId = this.productDetails.brand != null ? this.productDetails.brand.id : null;
      this.unitId = this.productDetails.unit != null ? this.productDetails.unit.id : null;
      this.ddp_destination= this.productDetails.ddp_destination!=null?this.productDetails.ddp_destination:''
      var setLeadTime;
      if (this.productDetails.delivery_method == 1) {
        setLeadTime = this.productDetails.ddp_lead_time;
      } else {
        setLeadTime = this.productDetails.ex_works_lead_time;
      }
      this.removeEmptyChildren(this.categories);
      // console.log(this.childCatId);
      this.selectedOption = this.productDetails.delivery_method;
      this.productUpdateForm.setValue({
        category: this.parentCatId,
        subCategory: this.subCatId,
        childCategory: this.childCatId,
        prodName: this.productDetails.name,
        prodDetails: this.productDetails.description,
        manufactererName: this.brandId,
        prodStock: this.productDetails.stock_quantity,
        prodSize: this.productDetails.size,
        prodUnit: this.unitId,
        prodDeliMethod: this.productDetails.delivery_method,
        ddp_destination:this.ddp_destination,
        leadTime: setLeadTime,
        shopPick:
          this.productDetails.pickup_address.length != 0
            ? this.productDetails.pickup_address[0].address
            : '',
        prodPrice: this.productDetails.unit_price,
        prodImage: null,
        attachments: null,
      });
      if (this.productDetails.image1 != null) {
        this.existingImgList.push({
          link: config.img_base_url + this.productDetails.image1,
          column: 'image1',
        });
      }
      if (this.productDetails.image2 != null) {
        this.existingImgList.push({
          link: config.img_base_url + this.productDetails.image2,
          column: 'image2',
        });
      }
      this.existingFiles =
        this.productDetails.attachment.length != 0
          ? this.productDetails.attachment
          : [];
      console.log(this.existingImgList);
    });
  }

  fileNameExtarc(path: string) {
    var initialPathArray = path.split('/');
    return initialPathArray[initialPathArray.length - 1];
  }

  // remove empty children form the array
  removeEmptyChildren(data: any[]) {
    data.forEach((key) => {
      // console.log(key)
      key.children.forEach((key2) => {
        // console.log(key2)
        this.subCategories.push(key2);
        key2.children.forEach((key3) => {
          // console.log(key3.id, this.childCatId)
          this.childCategories.push(key3);
          // get parent and subcat Id
          if (key3.id == this.childCatId) {
            this.parentCatId = key.id;
            this.subCatId = key2.id;
            console.log(this.parentCatId, this.subCatId);
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
    console.log(this.childCategories);
  }

  setSubCAt(catId: any) {
    this.subCategories = this.categories.find(
      (item:any) => item.id == catId
    ).children;
  }

  setChildCAt(subCatId: any) {
    this.childCategories = this.subCategories.find(
      (item) => item.id == subCatId
    ).children;
  }

  addNewBrand(value: string){
    if(value == 'new'){
      this.openAddBrandDialog();
    }
  }

  openAddBrandDialog() {
    const dialogRef = this.dialog.open(AddBrandModalComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null && result.length>0) {
        this.spinner.show();
        // console.log(`Dialog result: ${result}`);
        this.addProductService.addBrand(result).subscribe(
          (success: any) => {
            this.brandId = success.data[0].id;
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
    });
  }

  // addNewColor(value) {
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
  //           this.colorId = success.data[0].id;
  //           this.addProductService.getColorList().subscribe((item) => {
  //             this.colorList = item.data[0];
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

  addNewUnit(value: string) {
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
            this.unitId = success.data[0].id;
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
    console.log(value);
    this.spinner.show();
    this.productUploadFormData.append('category', value.childCategory);
    if (this.selectedFiles != undefined) {
      // this.productUploadFormData.append('attachment', this.selectedFiles[0], this.selectedFiles[0].name);
      for (var i = 0; i < this.selectedFiles.length; i++) {
        this.productUploadFormData.append(
          `attachment[${i}]path`,
          this.selectedFiles[i],
          this.selectedFiles[i].name
        );
      }
    }
    if(value.ddp = 2) {
      this.productUploadFormData.append('pickup_address[0]city', "1");
      this.productUploadFormData.append('pickup_address[0]address', value.shopPick);
    }
    this.productUploadFormData.append('brand', value.manufactererName);
    this.productUploadFormData.append('size', value.prodSize);
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
    if(value.prodDeliMethod=='1' && value.ddp_destination.length>0){
      this.productUploadFormData.append('ddp_destination',value.ddp_destination)
    }
    if (value.prodDeliMethod == 1) {
      this.productUploadFormData.append('ddp_lead_time', value.leadTime);
      this.productUploadFormData.append('ex_works_lead_time', '0');
    } else if (value.prodDeliMethod == 2) {
      this.productUploadFormData.append('ddp_lead_time', '0');
      this.productUploadFormData.append('ex_works_lead_time', value.leadTime);
    }
    this.productUploadFormData.append('stock_quantity', value.prodStock);
    this.productUploadFormData.append('status', '1');
    if (this.productDetails.image1 != null && this.selectedImage.length == 1) {
      this.productUploadFormData.append(
        'image2',
        this.selectedImage[0],
        this.selectedImage[0].name
      );
    } else {
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
    }
    // if(this.productDetails.image1 != null)
    this.addProductService
      .updateProduct(this.productUploadFormData, this.productDetails.id)
      .subscribe(
        (success) => {
          console.log(success);
          this.spinner.hide();
          this.selectedImage = [];
          this.imgPreviewList = [];
          this.existingImgList = [];
          this.selectedFiles = [];
          this.ngOnInit();
          swal('Succeed', success.message, 'success');
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          swal('Failed!', error.error.message, 'error');
        }
      );
  }

  deleteExistingImage(value, id) {
    this.spinner.show();
    console.log(value.column);
    this.addProductService
      .deleteProdImage(this.productId, value.column)
      .subscribe((success) => {
        console.log(success);
        this.existingImgList.splice(id, 1);
        // this.imgPreviewList = [];
        // this.selectedImage = [];
        this.ngOnInit();
        this.spinner.hide();
      });
  }

  handleImgSelect(event) {
    // this.existingImgList.forEach(element => {
    //   if(element.image1){
    //     this.selectedImage.push({"image2": event.target.files[0]});
    //   }else if (this.selectedImage.length == 1){
    //     this.selectedImage.push({"image1": event.target.files[0]});
    //   }else {
    //     this.selectedImage.push({"image2": event.target.files[0]});
    //   }
    // })
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

  deleteExistingFile(attachmentId) {
    this.spinner.show();
    console.log(attachmentId);
    this.addProductService
      .deleteProdAttachment(attachmentId)
      .subscribe((success) => {
        console.log(success);
        this.ngOnInit();
        this.spinner.hide();
      });
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

  openDialog() {
    const dialogRef = this.dialog.open(DialogueComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        this.deleteProduct()
      }
    });
  }

  deleteProduct(){
    this.spinner.show();
    this.addProductService.deleteProduct(this.productId).subscribe((success: any) => {
      console.log(success.message);
      this.spinner.hide();
      swal('Success!', 'Product deleted succssfully', 'success').then(()=>{
        this.router.navigate(['/dashboard/products'])
      });
    },
    (error: any) => {
      console.log(error);
    })
  }
}
