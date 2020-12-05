import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {

  error;
  msg;

  constructor() { }

  ngOnInit(): void {
  }

  changePass(d1, d2){
    console.log(d1, d2);
  }

}
