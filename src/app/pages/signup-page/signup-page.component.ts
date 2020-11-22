import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  error: any;

  constructor() { }

  ngOnInit(): void {
  }

  signup(username: string, email: string, password1: string, password2: string) {
    // to do sign up
  }

}
