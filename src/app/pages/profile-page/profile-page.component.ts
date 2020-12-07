import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from '../../shared/services/user-auth.service';
import { CountryListService } from '../../shared/services/country-list.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  userId;
  userInfo;
  changePass = false;
  editProfile = false;
  cities: any = [];
  countries: any = [];

  constructor(
    private authService: UserAuthService,
    private route: ActivatedRoute,
    private countryList: CountryListService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId == localStorage.getItem('uid')) {
      this.getCountries();
      this.authService.getUser(this.userId).subscribe((data) => {
        this.userInfo = data.data;
        // console.log(this.userInfo);
      });
    } else {
      alert('access is denied');
    }
  }

  setEditProfile(editProfile: boolean) {
    this.editProfile = editProfile;
    // after profile update, update the city list too
    if (this.userInfo.country) this.onCountryChange(this.userInfo.country);
  }

  getCountries() {
    this.countryList.allCountries().subscribe(
      (data) => {
        this.countries = ['select one', ...data.data];
      },
      (err) => console.error(err)
    );
  }

  onCountryChange(countryId) {
    this.countryList.allCities(countryId).subscribe(
      (data) => {
        this.cities = ['select one', ...data.data];
      },
      (err) => console.error(err)
    );
  }
}
