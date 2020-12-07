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

@Component({
	selector: 'app-edit-profile-form',
	templateUrl: './edit-profile-form.component.html',
	styleUrls: ['./edit-profile-form.component.css'],
})
export class EditProfileFormComponent implements OnInit {
	changePass = false;

	constructor(
		private authService: UserAuthService,
		private route: ActivatedRoute
	) {}

	@Input() userId;
	@Input() userInfo;
	@Input() editProfile;
	@Output() setEditProfile = new EventEmitter<boolean>();

	ngOnInit(): void {}

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
}
