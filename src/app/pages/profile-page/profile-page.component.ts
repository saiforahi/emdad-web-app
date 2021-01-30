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
  editProfileState = true;
  cities: any = [];
  countries: any = [];
  error;
  userMail;
  country: any;
  city: any;

  show_change_pass_form;
  show_profile_form;
  show_order_history;
  show_manage_quotations;
  constructor(
    private authService: UserAuthService,
    private route: ActivatedRoute,
    private countryList: CountryListService
  ) { 
    this.show_change_pass_form=false;
    this.show_profile_form=true;
    this.show_order_history=false;
    this.show_manage_quotations=false;
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.authService.uName.subscribe(data => {
        this.userMail = data;
    })
    if (this.userId == localStorage.getItem('uid')) {
      this.getCountries();
      this.authService.getUser(this.userId).subscribe((data) => {
        this.userInfo = data.data;
        console.log(this.userInfo);
        // if country is already set then load the cities of the country
        if (this.userInfo.country) {
          this.onCountryChange(this.userInfo.country);
        }
        (error) => (this.error = error);
      });
    } else {
      alert('access is denied');
    }
  }

  logout(){
    this.authService.logout();
  }
  getCountries() {
    this.countryList.allCountries().subscribe(
      (data) => {
        this.country = data.data;
        console.log(data.data)
        this.countries = ['select one', ...data.data];
      },
      (err) => console.error(err)
    );
  }
  show_logout_modal(){
    document.getElementById('profileLogout').style.display="block"
  }
  onCountryChange(countryId) {
    this.countryList.allCities(countryId).subscribe(
      (data) => {
        this.city = data.data;
        console.log(data.data)
        this.cities = ['select one', ...data.data];
      },
      (err) => console.error(err)
    );
  }

  getCountryOfCity(cityId){
    this.countryList.getCountryOfCity(cityId).subscribe(item =>{
      this.country = item;
    })
  }

  setEditProfile(editProfileState: boolean) {
    this.editProfileState = editProfileState;
    // after profile update, update the city list too
    if (this.userInfo.country) this.onCountryChange(this.userInfo.country);
  }

  updateCities(cities: any) {
    this.cities = cities;
  }

  updateEditedUserInfo(editUserInfo: any) {
    this.userInfo = editUserInfo;
  }
}
