import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	HttpClient,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
} from '@angular/common/http';
import { UserAuthService } from '../../shared/services/user-auth.service';
import { CountryListService } from '../../shared/services/country-list.service';


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
	constructor(
		private authService: UserAuthService,
		private route: ActivatedRoute,
		private countryList: CountryListService
	) {}

	@Input() userId;
	@Input() countries;
	@Input() cities;
	@Output() setEditProfile = new EventEmitter<boolean>();
	@Output() updateCities = new EventEmitter<any>();
	@Output() updateEditedUserInfo = new EventEmitter<any>();

	ngOnInit(): void {
		this.authService.uName.subscribe(data => {
			this.userMail = data;
		})
		this.authService.getUser(this.userId).subscribe((data) => {
			this.editUserInfo = data.data;
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
		// console.log(this.userInfo);
		console.log(this.editUserInfo)
		this.updateUserInfo();
		this.authService.updateProfile(this.userId, this.editUserInfo).subscribe(
			(success) => console.log(success),
			(error) => console.error(error)
		);
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
		console.log(countryId)
		if (countryId !== this.editUserInfo.country) {
			this.editUserInfo.city = '';
		}
		this.countryList.allCities(countryId).subscribe(
			(data) => {
				this.editCities = [...data.data];
				console.log(this.editCities)
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
}
