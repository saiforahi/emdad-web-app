import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  HttpClient,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../shared/services/user-auth.service';
import { CountryListService } from '../../../shared/services/country-list.service';
import swal from 'sweetalert';
import { config } from 'src/config';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css'],
})
export class EditProfileFormComponent implements OnInit {
  changePass = false;
  editCities: any = [];
  editUserInfo: any;
  userMail: string;
  error;
  country;
  city;
  profile_pic: any = undefined;
  new_profile_pic: any = undefined;
  addressError: any = undefined;
  countryError: any = undefined;
  cityError: any = undefined;

  constructor(
    private authService: UserAuthService,
    private route: ActivatedRoute,
    private countryList: CountryListService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  @Input() userId;
  @Input() countries;
  @Input() cities;
  @Output() setEditProfile = new EventEmitter<boolean>();
  @Output() updateCities = new EventEmitter<any>();
  @Output() updateEditedUserInfo = new EventEmitter<any>();

  ngOnInit(): void {
    this.authService.uName.subscribe((data) => {
      this.userMail = data;
    });
    this.authService.getUser(this.userId).subscribe((data) => {
      this.editUserInfo = data.data;
      console.log('profile details',this.editUserInfo)
      this.country=this.editUserInfo.country!=null?this.editUserInfo.country.id:'-1'
      this.city=this.editUserInfo.city!=null?this.editUserInfo.city.id:'-1'
      // if profile_pic is a string(path), then set the value
      if (typeof this.editUserInfo.profile_pic === 'string')
        this.profile_pic =
          config.base_url + this.editUserInfo.profile_pic.slice(1);
      // if country is already set then load the cities of the country
      if (this.editUserInfo.country!=null) {
        this.onCountryChange(this.editUserInfo.country.id);
      }
      (error) => (this.error = error);
    });
    this.getCountries();
    // this.editCities = [...this.cities];
    // if (this.editUserInfo.country) {
    // 	this.onCountryChange(this.userInfo.country);
    // }
  }
  saveData() {
    this.updateUserInfo();
    this.spinner.show();

    // clearing errors before form submission
    this.addressError = false;
    this.countryError = false;
    this.cityError = false;
    this.editUserInfo.country=this.country
    this.editUserInfo.city=this.city

    if (this.editUserInfo.address.length === 0) {
      this.addressError = true;
      this.spinner.hide();
    }

    if (this.editUserInfo.country === null || this.editUserInfo.country < 1) {
      this.countryError = true;
      this.spinner.hide();
    }

    if (this.editUserInfo.city === null || this.editUserInfo.city < 1) {
      this.cityError = true;
      this.spinner.hide();
    }

    if (!this.addressError && !this.countryError && !this.cityError) {
      delete this.editUserInfo.profile_pic;
      this.authService.updateProfile(this.userId, this.editUserInfo).subscribe(
        (success) => {
          localStorage.setItem('user_info', this.editUserInfo);
          this.authService.uFullName.next(this.editUserInfo.full_name);
          localStorage.setItem('ufullname', this.editUserInfo.full_name);
          this.spinner.hide();
          swal('Updated!', 'Profile Updated!', 'success');
        },
        (error) => console.error(error)
      );
    }
  }
  getCountries() {
    this.countryList.allCountries().subscribe(
      (data) => {
        this.countries = [...data.data];
        // console.log(this.countries);
      },
      (err) => console.error(err)
    );
  }
  onCountryChange(countryId) {
    // reset city if countryId changed
    // console.log(countryId);
    if (countryId !== this.country) {
      this.city='-1'
      this.editUserInfo.city=null;
    }
    this.countryList.allCities(countryId).subscribe(
      (data) => {
        this.editCities = [...data.data];
        // console.log(this.editCities);
      },
      (err) => console.error(err)
    );
  }
  updateCityList() {
    this.updateCities.emit(this.editCities);
  }

  updateUserInfo() {
    this.updateEditedUserInfo.emit(this.editUserInfo);
  }

  uploadProfilePic(event: any) {
    let file = event.target.files[0];
    let profilePic = new FormData();
    profilePic.append('profile_pic', file, file.name);
    this.spinner.show();

    // upload the picture immidiately
    this.authService.updateProfile(this.userId, profilePic).subscribe(
      (success: any) => {
        this.spinner.hide();
        this.openSnackBar('Profile Picture Updated!', 'OK');
        this.profile_pic = config.img_base_url + success.data.profile_pic;
        this.authService.uImg.next(this.profile_pic);
        localStorage.setItem('uimg', this.profile_pic);
      },
      (error) => console.error(error)
    );
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
