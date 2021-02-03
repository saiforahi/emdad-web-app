import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
  ],
})
export class MaterialModule {}
