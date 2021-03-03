import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quotation-view-modal',
  templateUrl: './quotation-view-modal.component.html',
  styleUrls: ['./quotation-view-modal.component.css'],
})
export class QuotationViewModalComponent implements OnInit {
  selectedImage;

  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  removeFile(i){

  }

  handleFileSelect(i) {

  }
}
