import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { CountryListService } from 'src/app/shared/services/country-list.service';
import { FileService } from 'src/app/shared/services/file.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import swal from 'sweetalert';
import * as fileSaver from 'file-saver';
import { config } from 'src/config';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';
import { TranslateService } from '@ngx-translate/core';

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
  // comRegistration: AbstractControl;
  // expDate: AbstractControl;
  country: AbstractControl;
  city: AbstractControl;
  area: AbstractControl;
  zipCode: AbstractControl;
  sellerDescription: AbstractControl;
  attachments: AbstractControl;
  showPassState: boolean = false;
  confShowPassState: boolean = false;
  selectedImage: any = [];
  regBtnDisabled = true;
  passMatched: boolean = false;
  countryList: any;
  cityList: any;
  sellerProfileFormData = new FormData();
  error: any;
  userData: any;
  existingFiles: number;
  sellerProfilePicData = new FormData();
  profile_pic: any;
  sellerBannerPicData = new FormData();
  banner_pic: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private contry: CountryListService,
    private spinner: SpinnerService,
    private fileService: FileService,
    private authService: UserAuthService,
    private subscription: SubscriptionService,
    public translate : TranslateService
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
    this.contry.allCountries().subscribe((item) => {
      this.countryList = item.data;
    });
    this.populateFormData();
    this.sellerProfileForm = this.fb.group({
      comName: ['', [Validators.required]],
      comPhone: [
        '',
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
      email: [''],
      comAddress: ['', [Validators.required]],
      // comRegistration: [''],
      // expDate: [''],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      area: [''],
      zipCode: [''],
      sellerDescription: [''],
      attachments: [''],
    });
    this.comName = this.sellerProfileForm.controls['comName'];
    this.comPhone = this.sellerProfileForm.controls['comPhone'];
    this.email = this.sellerProfileForm.controls['email'];
    this.comAddress = this.sellerProfileForm.controls['comAddress'];
    // this.comRegistration = this.sellerProfileForm.controls['comRegistration'];
    // this.expDate = this.sellerProfileForm.controls['expDate'];
    this.country = this.sellerProfileForm.controls['country'];
    this.city = this.sellerProfileForm.controls['city'];
    this.area = this.sellerProfileForm.controls['area'];
    this.zipCode = this.sellerProfileForm.controls['zipCode'];
    this.attachments = this.sellerProfileForm.controls['attachments'];
    this.sellerDescription = this.sellerProfileForm.controls[
      'sellerDescription'
    ];
  }

  populateFormData() {
    this.authService
      .getSeller(localStorage.getItem('s_uid'))
      .subscribe((item) => {
        console.log(item);
        this.userData = item.data;
        if (this.userData.profile_pic != null){
          this.profile_pic = config.base_url + this.userData.profile_pic.slice(1);
          this.authService.s_uImg.next(this.profile_pic);
        }
        if (this.userData.store_pic != null)
          this.banner_pic = config.base_url + this.userData.store_pic.slice(1);
        if (
          this.userData.seller_attachment1 != null &&
          this.userData.seller_attachment2 != null
        ) {
          this.existingFiles = 2;
          // console.log(this.existingFiles);
        } else if (
          this.userData.seller_attachment1 != null ||
          this.userData.seller_attachment2 != null
        ) {
          this.existingFiles = 1;
          // console.log(this.existingFiles);
        } else {
          this.existingFiles = 0;
          // console.log(this.existingFiles);
        }
        if (this.userData.country != null) {
          this.getciTyList(this.userData.country.id);
        }
        this.sellerProfileForm.setValue({
          comName: this.userData.store_name,
          comPhone: this.userData.phone,
          email: localStorage.getItem('s_username'),
          comAddress: this.userData.store_address,
          country: this.userData.country?.id,
          city: this.userData.city?.id,
          area: this.userData.area,
          zipCode: this.userData.zip_code,
          sellerDescription: this.userData.seller_description,
          attachments: '',
        });
      });
  }

  onSubmit(value) {
    console.log(value);
    this.spinner.showSpinner.next(true);
    this.sellerProfileFormData.append('store_name', value.comName);
    this.sellerProfileFormData.append('email', value.email);
    this.sellerProfileFormData.append('phone', value.comPhone);
    this.sellerProfileFormData.append('store_address', value.comAddress);
    this.sellerProfileFormData.append('country', value.country);
    this.sellerProfileFormData.append('city', value.city);
    this.sellerProfileFormData.append('zip_code', value.zipCode);
    this.sellerProfileFormData.append(
      'seller_description',
      value.sellerDescription
    );
    this.sellerProfileFormData.append('area', value.area);
    if (
      this.userData.seller_attachment1 == null &&
      this.userData.seller_attachment2 == null &&
      this.selectedImage.length == 2
    ) {
      // if two files to upload
      console.log('condition one');
      this.sellerProfileFormData.append(
        'seller_attachment1',
        this.selectedImage[0]
      );
      this.sellerProfileFormData.append(
        'seller_attachment2',
        this.selectedImage[1]
      );
    } else if (
      this.userData.seller_attachment1 == null &&
      this.selectedImage.length == 1
    ) {
      // if only one file to upload in attachment1
      console.log('condition two');
      this.sellerProfileFormData.append(
        'seller_attachment1',
        this.selectedImage[0]
      );
      // this.sellerProfileFormData.append(
      //   'seller_attachment2',
      //   null
      // );
    } else if (
      this.userData.seller_attachment2 == null &&
      this.selectedImage.length == 1
    ) {
      // if only one file to upload in attachment2
      console.log('condition three');
      // this.sellerProfileFormData.append(
      //   'seller_attachment1',
      //   null
      // );
      this.sellerProfileFormData.append(
        'seller_attachment2',
        this.selectedImage[0]
      );
    }
    var uId = localStorage.getItem('s_uid');
    console.log('form data', this.sellerProfileFormData.get('city'));
    this.authService
      .updateSellerProfile(uId, this.sellerProfileFormData)
      .subscribe(
        (success) => {
          console.log(success);
          this.selectedImage = [];
          this.ngOnInit();
          this.spinner.showSpinner.next(false);
          swal('Succeed', 'Company profile updated successfully', 'success');
        },
        (error: any) => {
          console.log(error);
          this.spinner.showSpinner.next(false);
          swal('Failed!', 'Something went wrong', 'error');
        }
      );
  }

  getciTyList(id: number) {
    this.contry.allCities(id).subscribe((item) => {
      console.log(item.data);
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

  splitFileName(fileUrl) {
    const nameArray = fileUrl.split('/');
    return nameArray[nameArray.length - 1];
  }

  download(ticket_image_url: string) {
    this.fileService.downloadFile(ticket_image_url).subscribe((response) => {
      console.log(response);
      let blob: any = new Blob([response], {
        type: 'text/plain;charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, this.splitFileName(ticket_image_url));
    }),
      (error) => console.log('Error downloading the file'),
      () => console.info('File downloaded successfully');
  }

  deleteExistingFile(column_name) {
    // this.sellerProfileFormData.set(column_name, null);
    this.authService.deleteSellerAttachments(column_name).subscribe((item) => {
      console.log(item);
      this.ngOnInit();
      swal('Succeed', 'Attachments deleted successfully', 'success');
    });
  }

  uploadProPic(event) {
    console.log(event);
    this.sellerProfilePicData.append('profile_pic', event.target.files[0]);
    var uId = localStorage.getItem('s_uid');
    this.authService
      .uploadSellerProfilePic(uId, this.sellerProfilePicData)
      .subscribe(
        (success) => {
          console.log(success);
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  uploadBannerPic(event) {
    console.log(event);
    this.sellerBannerPicData.append('store_pic', event.target.files[0]);
    var uId = localStorage.getItem('s_uid');
    this.authService
      .uploadSellerBannerPic(uId, this.sellerBannerPicData)
      .subscribe(
        (success) => {
          console.log(success);
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
