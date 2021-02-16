import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-input-alert',
  templateUrl: './form-input-alert.component.html',
  styleUrls: ['./form-input-alert.component.css']
})
export class FormInputAlertComponent implements OnInit {
  @Input() alertMsg = '';

  constructor() { }

  ngOnInit(): void {
  }

}
