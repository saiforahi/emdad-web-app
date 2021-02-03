import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

interface Cash_Details {
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
};
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  isCard:boolean;
  isWired:boolean;
  new_address:boolean;
  cash_details:Cash_Details;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.isCard=true;
    this.isWired=false;
    this.cash_details=this.route.snapshot.params['cash_details']
  }
  show_card_inputs(){
    this.isWired=false;
    this.isCard=true;
  }
  show_wired_inputs(){
    this.isCard=false;
    this.isWired=true;
  }
  show_address_form(){
    this.new_address=!this.new_address
  }
}
