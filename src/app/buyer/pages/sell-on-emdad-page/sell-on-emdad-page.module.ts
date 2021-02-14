import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellOnEmdadPageComponent } from './sell-on-emdad-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from 'src/app/ui/commonui/commonui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../../material.module';

const routes: Routes = [
  { path: '', component: SellOnEmdadPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [SellOnEmdadPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    NgbModule,
    MaterialModule
  ]
})
export class SellOnEmdadPageModule { }
