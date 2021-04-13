import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-color-modal',
  templateUrl: './add-color-modal.component.html',
  styleUrls: ['./add-color-modal.component.css']
})
export class AddColorModalComponent implements OnInit {
  colorName;

  constructor() { }

  ngOnInit(): void {
  }

}
