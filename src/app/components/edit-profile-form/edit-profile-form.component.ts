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

	constructor(
		private authService: UserAuthService,
		private route: ActivatedRoute,
		private countryList: CountryListService
	) {}

	@Input() userId;
	@Input() userInfo;
	@Input() editProfileState;
	@Input() countries;
	@Input() cities;
	@Output() setEditProfile = new EventEmitter<boolean>();
	@Output() updateCities = new EventEmitter<any>();
	@Output() updateEditedUserInfo = new EventEmitter<any>();

	ngOnInit(): void {
		this.authService.uName.subscribe(data => {
			this.userMail = data;
		})
		this.editUserInfo = this.userInfo;
		this.editCities = [...this.cities];
		if (this.editUserInfo.country) {
			this.onCountryChange(this.userInfo.country);
		}
	}

	saveData() {
		// console.log(this.userInfo);
		console.log(this.editUserInfo)
		this.updateEditProfile();
		this.updateUserInfo();
		this.authService.updateProfile(this.userId, this.editUserInfo).subscribe(
			(success) => console.log(success),
			(error) => console.error(error)
		);
	}

	onCountryChange(countryId) {
		// reset city if countryId changed
		if (countryId !== this.editUserInfo.country) {
			this.editUserInfo.city = '';
		}
		this.countryList.allCities(countryId).subscribe(
			(data) => {
				this.editCities = ['select one', ...data.data];
			},
			(err) => console.error(err)
		);
	}

	updateEditProfile() {
		this.setEditProfile.emit(!this.editProfileState);
	}

	updateCityList() {
		this.updateCities.emit(this.editCities);
	}

	updateUserInfo() {
		this.updateEditedUserInfo.emit(this.editUserInfo);
	}
}
