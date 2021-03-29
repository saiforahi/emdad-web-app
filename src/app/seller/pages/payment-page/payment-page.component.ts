import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup;
  cardNo: AbstractControl;
  cardHolder: AbstractControl;
  expiry:AbstractControl;
  cvv:AbstractControl;

  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNo: ['', [Validators.required]] ,
     cardHolder: [''],
     expiry:[''],
     cvv:['']
    });
    this.cardNo = this.paymentForm.controls['cardNo'];
    this.cardHolder=this.paymentForm.controls['cardHolder'];
    this.cvv=this.paymentForm.controls['cvv'];
    this.expiry=this.paymentForm.controls['expiry']
    
  }

  onSubmit(){

  }

}
