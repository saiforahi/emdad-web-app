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
	stateInfo: any = [];
	cityInfo: any = [];
	countryInfo: any = [];

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
	}

	updateEditProfile() {
		this.setEditProfile.emit(!this.editProfile);
	}

	saveData() {
		console.log(this.userInfo);
		this.updateEditProfile();
		this.authService.updateProfile(this.userId, this.userInfo).subscribe(
			(success) => console.log(success),
			(error) => console.error(error)
		);
	}

	getCountries() {
		this.countryList.allCountries().subscribe(
			(data) => {
				this.countryInfo = data.Countries;
				console.log(this.countryInfo);
			},
			(err) => console.error(err)
		);
	}

	onChangeCountry(countryValue) {
		this.stateInfo = this.countryInfo[countryValue].States;
		this.cityInfo = this.stateInfo[0].Cities;
		console.log(this.cityInfo);
	}

	onChangeState(stateValue) {
		this.cityInfo = this.stateInfo[stateValue].Cities;
		//console.log(this.cityInfo);
	}
}
