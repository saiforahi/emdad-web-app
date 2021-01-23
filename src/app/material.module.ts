import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatExpansionModule
  ],
})
export class MaterialModule { }
