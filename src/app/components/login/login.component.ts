import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;

  constructor() { }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    // to do login
  }

}
