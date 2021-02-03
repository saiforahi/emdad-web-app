import {Component, Type} from '@angular/core';
import { UserAuthService } from '../../shared/services/user-auth.service';
@Component({
    selector: 'profile-logout-modal',
    styleUrls: ['./profile-logout-modal.component.css'],
    templateUrl: './profile-logout-modal.component.html'
})
export class ProfileLogoutModal {
    constructor(private authService:UserAuthService) {}
    hide_logout(){
        document.getElementById('profileLogout').style.display="none"
    }
    logout(){
        this.authService.logout();
    }
    // open(name: string) {
    //     this._modalService.open(MODALS[name]);
    // }
}