import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import{MaterialModule} from '../../../material.module';
import { OpenTicketPageComponent } from './open-ticket-page.component';

const routes: Routes = [
  { path: '', component: OpenTicketPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    MaterialModule

  ],
})
export class OpenTicketPageModule {}
