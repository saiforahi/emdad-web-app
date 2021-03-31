import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quotation-view-modal',
  templateUrl: './quotation-view-modal.component.html',
  styleUrls: ['./quotation-view-modal.component.css'],
})
export class QuotationViewModalComponent implements OnInit {
  selectedImage;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  removeFile(i){

  }

  handleFileSelect(i) {

  }
}
