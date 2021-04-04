import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportPageComponent } from './support-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { TicketViewModalComponent } from './ticket-view-modal/ticket-view-modal.component';
import { OpenTicketModalComponent } from './open-ticket-modal/open-ticket-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  {path:'', component: SupportPageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [SupportPageComponent, TicketViewModalComponent, OpenTicketModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonuiModule,
    MaterialModule,
    NgbModule
  ],
  entryComponents: [TicketViewModalComponent, OpenTicketModalComponent],
})
export class SupportPageModule { }
