import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonuiModule } from '../../ui/commonui/commonui.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../material.module';

const routes: Routes = [
  { path: '', component: SearchPageComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [SearchPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonuiModule,
    NgbModule,
    MaterialModule
  ]
})
export class SearchPageModule { }
