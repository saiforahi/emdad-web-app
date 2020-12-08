import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePageComponent } from './profile-page.component';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordFormComponent } from '../../components/change-password-form/change-password-form.component';
import { EditProfileFormComponent } from '../../components/edit-profile-form/edit-profile-form.component';

const routes: Routes = [
	{ path: '', component: ProfilePageComponent, pathMatch: 'full' },
];

@NgModule({
	declarations: [
		ProfilePageComponent,
		ChangePasswordFormComponent,
		EditProfileFormComponent,
	],
	imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class ProfilePageModule {}
