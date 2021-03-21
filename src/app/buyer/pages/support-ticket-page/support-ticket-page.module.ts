import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SupportTicketPageComponent } from './support-ticket-page.component';
import { ViewTicketDetailsComponent } from './view-ticket-details/view-ticket-details.component';

const routes: Routes = [
  { path: '', component: SupportTicketPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [ViewTicketDetailsComponent],
  imports: [CommonModule, FormsModule,MaterialModule, RouterModule.forChild(routes)],
  entryComponents: [ViewTicketDetailsComponent],
})
export class SupportTicketPageModule {}
