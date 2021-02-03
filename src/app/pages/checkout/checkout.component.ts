import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserAuthService} from '../../shared/services/user-auth.service'
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
  cash_details:any;
  address:any;
  constructor(private route:ActivatedRoute,private authService: UserAuthService) { }

  ngOnInit(): void {
    this.isCard=true;
    this.isWired=false;
    this.cash_details=JSON.parse(localStorage.getItem('finalCart'))
    this.authService.getUser(localStorage.getItem('uid')).subscribe((data) => {
			this.address = data.data.address;
			// if country is already set then load the cities of the country
		});
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
