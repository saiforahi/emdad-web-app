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
	cities: any = [];
	countries: any = [];

	constructor(
		private authService: UserAuthService,
		private route: ActivatedRoute,
		private countryList: CountryListService
	) {}

	@Input() userId;
	@Input() userInfo;
	@Input() editProfile;
	@Output() setEditProfile = new EventEmitter<boolean>();

	ngOnInit(): void {
		this.getCountries();
		if (this.userInfo.country) {
			this.onCountryChange(this.userInfo.country);
		}
	}

	updateEditProfile() {
		this.setEditProfile.emit(!this.editProfile);
	}

	saveData() {
		// console.log(this.userInfo);
		this.updateEditProfile();
		this.authService.updateProfile(this.userId, this.userInfo).subscribe(
			(success) => console.log(success),
			(error) => console.error(error)
		);
	}

	getCountries() {
		this.countryList.allCountries().subscribe(
			(data) => {
				this.countries = [...this.countries, ...data.data];
			},
			(err) => console.error(err)
		);
	}

	onCountryChange(countryId) {
		// reset city if countryId changed
		if (countryId !== this.userInfo.country) {
			this.userInfo.city = '';
		}

		this.countryList.allCities(countryId).subscribe(
			(data) => {
				this.cities = ['select one', ...data.data];
			},
			(err) => console.error(err)
		);
	}
}
