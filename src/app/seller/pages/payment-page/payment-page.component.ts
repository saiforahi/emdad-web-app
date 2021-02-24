import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup;
  email: any;
  password: any;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.email = this.paymentForm.controls['email'];
    this.password = this.paymentForm.controls['password'];
  }

}
