import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-unit-modal',
  templateUrl: './add-unit-modal.component.html',
  styleUrls: ['./add-unit-modal.component.css']
})
export class AddUnitModalComponent implements OnInit {
  unitName;

  constructor() { }

  ngOnInit(): void {
  }

}
