import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-brand-modal',
  templateUrl: './add-brand-modal.component.html',
  styleUrls: ['./add-brand-modal.component.css']
})
export class AddBrandModalComponent implements OnInit {
  brandName = '';

  constructor() { }

  ngOnInit(): void {
  }

}
