import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  isCard:boolean;
  isWired:boolean;
  constructor() { }

  ngOnInit(): void {
    this.isCard=true;
    this.isWired=false;
  }
  show_card_inputs(){
    this.isWired=false;
    this.isCard=true;
  }
  show_wired_inputs(){
    this.isCard=false;
    this.isWired=true;
  }
}
