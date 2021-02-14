import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { OpenTicketPageComponent } from './open-ticket-page.component';

const routes: Routes = [
  { path: '', component: OpenTicketPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class OpenTicketPageModule {}
