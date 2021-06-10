import {Component, Type} from '@angular/core';
import{MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UserAuthService } from '../../../shared/services/user-auth.service';
@Component({
    selector: 'profile-logout-modal',
    styleUrls: ['./profile-logout-modal.component.css'],
    templateUrl: './profile-logout-modal.component.html'
})
export class ProfileLogoutModal {
    constructor(private authService:UserAuthService,
        public dialogRef: MatDialogRef<ProfileLogoutModal>) {}
    hide_logout(){
        this.dialogRef.close();
    }
    logout(){
        this.authService.logout();
    }
    // open(name: string) {
    //     this._modalService.open(MODALS[name]);
    // }
}