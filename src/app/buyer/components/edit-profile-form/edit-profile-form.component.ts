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
  profile_pic: any = undefined;
  new_profile_pic: any = undefined;
  constructor(
    private authService: UserAuthService,
    private route: ActivatedRoute,
    private countryList: CountryListService,
    private snackBar: MatSnackBar
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
      console.log('#####');
      console.log(this.editUserInfo);
      console.log('#####');
      // if profile_pic is a string(path), then set the value
      if (typeof this.editUserInfo.profile_pic === 'string')
        this.profile_pic =
          config.base_url + this.editUserInfo.profile_pic.slice(1);
      // if country is already set then load the cities of the country
      if (this.editUserInfo.country) {
        this.onCountryChange(this.editUserInfo.country);
      }
      (error) => (this.error = error);
    });
    this.getCountries();
    this.editCities = [...this.cities];
    // if (this.editUserInfo.country) {
    // 	this.onCountryChange(this.userInfo.country);
    // }
  }
  saveData() {
    // if (this.is_form_valid()) {
    this.updateUserInfo();

    delete this.editUserInfo.profile_pic;
    this.authService.updateProfile(this.userId, this.editUserInfo).subscribe(
      (success) => {
        localStorage.setItem('user_info', this.editUserInfo);
        swal('Updated!', 'Profile Updated!', 'success');
      },
      (error) => console.error(error)
    );
    // }
  }
  getCountries() {
    this.countryList.allCountries().subscribe(
      (data) => {
        this.countries = [...data.data];
        console.log(this.countries);
      },
      (err) => console.error(err)
    );
  }
  onCountryChange(countryId) {
    // reset city if countryId changed
    console.log(countryId);
    if (countryId !== this.editUserInfo.country) {
      this.editUserInfo.city = '';
    }
    this.countryList.allCities(countryId).subscribe(
      (data) => {
        this.editCities = [...data.data];
        console.log(this.editCities);
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

    // upload the picture immidiately
    this.authService.updateProfile(this.userId, profilePic).subscribe(
      (success: any) => {
        this.openSnackBar('Profile Picture Updated!', 'OK');
        this.profile_pic = config.base_url + success.data.profile_pic.slice(1);
      },
      (error) => console.error(error)
    );
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  is_form_valid(): boolean {
    let is_valid = false;
    if (
      typeof this.editUserInfo.full_name === 'string' &&
      this.editUserInfo.full_name.toString().length > 0
    ) {
      is_valid = true;
    } else {
      is_valid = false;
    }
    if (
      typeof this.editUserInfo.zip_code === 'number' &&
      this.editUserInfo.zip_code.toString().length > 0
    ) {
      is_valid = true;
    } else {
      is_valid = false;
    }
    if (
      typeof this.editUserInfo.address === 'string' &&
      this.editUserInfo.address.toString().length > 0
    ) {
      is_valid = true;
    } else {
      is_valid = false;
    }
    return is_valid;
  }
}
