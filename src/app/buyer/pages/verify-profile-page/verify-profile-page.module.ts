import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAuthService} from '../../../shared/services/user-auth.service'
import { VerifyProfilePageRoutingModule } from './verify-profile-page-routing.module';
import { VerifyProfilePageComponent } from './verify-profile-page.component';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';


@NgModule({
  declarations: [VerifyProfilePageComponent],
  imports: [
    CommonModule,
    VerifyProfilePageRoutingModule,
    CommonuiModule
  ]
})
export class VerifyProfilePageModule { }
