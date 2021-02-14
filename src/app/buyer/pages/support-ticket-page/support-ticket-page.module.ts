import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SupportTicketPageComponent } from './support-ticket-page.component';

const routes: Routes = [
  { path: '', component: SupportTicketPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class SupportTicketPageModule {}
