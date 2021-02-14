import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../app/shared/services/user-auth.service';
import {ProfileFormComponent} from '../../components/profile-form/profile-form.component';
const routes: Routes = [
    {
      path: '',
      component: ProfileFormComponent
    },
    {
      path: 'seller/login',
    }
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    ],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}