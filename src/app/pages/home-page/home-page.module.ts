import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  {path:'', component: HomePageComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class HomePageModule { }
