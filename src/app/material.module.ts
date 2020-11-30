import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class MaterialModule { }
